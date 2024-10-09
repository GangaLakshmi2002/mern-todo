const express = require('express');
const router = express.Router();
const User = require('../models/user');
const sendMail = require('../utils/nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// register
router.post('/register', async(req, res) => {
    const {email, password, role, username} = req.body;
    const user = new User({username, email, password, role});
    await user.save();
    const token =  jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    const url = `http://localhost:3000/verify-email/${token}`;
    console.log("url ->", url);
    sendMail(user.email, 'Email Verification', `<a href="${url}" >Click here to verify email</a>`);
    res.status(200).json({
        is_success: true,
        data: user,
        token: token,
        message: "user registered successfully"
    });
});

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    console.log("user", user)
    if(!user || !user.isVerified){
        res.status(404).json({
            is_success: false,
            message: 'User not found or Email not verified yet'
        })
    }
    const verify = await bcrypt.compare(password, user.password);
    if(!verify){
        res.status(404).json({
            is_success: false,
            message: 'Invalid Password'
        }) 
    }
    const token =jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({
        is_success: true,
        data: user,
        token,
        message: 'User logged Successfully'
    })
});

router.get('/verify-email/:token', async(req, res) => {
    const {token} = req.params;
    try {
       const {id} = jwt.verify(token, process.env.JWT_SECRET) ;
       const user = await User.findById(id);
       if(!user){
        return res.status(404).send('Invalid token')
       }
       user.isVerified = true,
       user.save();
       res.status(200).json({
        is_success: true,
        data: user,
        message: 'Email Verified successfully'
       });
       console.log("verified successfully");
    } catch (error) {
        res.status(500).send('Invalid token');
    }
})

router.post('/forgot-password', async(req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(404).json({
            is_success: false,
            message: 'User not found'
        })
    }
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token,
    user.resetPasswordExpires = Date.now() + 3600000; //1 hr
    await user.save();
    const url = `http://localhost:3000/reset-password/${token}`;
    sendMail(user.email, 'Reset Password', `<a href="${url}">click here to reset your password</a>`);
    res.status(200).json({
        is_success: true,
        message: 'mail sent successfully to change your password'
    })
})

router.post('/reset-password', async(req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    const user = await User.findOne({
        resetPasswordToken : token,
        resetPasswordExpires: { $gt : Date.now()}
    });
    if(!user){
        res.status(400).json({
            is_success: false,
            message: 'Invalid Token'
        })
    }
    user.password = password,
    user.resetPasswordExpires = undefined,
    user.resetPasswordToken = undefined,
    await user.save();
    res.status(200).json({
        is_success: true,
        message: 'Password reset Successfully'
    })
})

module.exports = router;
console.log("hi auth")