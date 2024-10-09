const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

router.get('/',  async(req, res) => {
    const users = await User.find({});
    res.json(users)
});

router.put('/:id', auth(['admin']), async(req, res) => {
    const {role} = req.body;
    const user = await User.findOneAndUpdate(req.params.id, req.body);
    res.json(user);
})

router.delete('/:id', auth(['admin']), async(req, res) => {
    await User.findOneAndDelete(req.params.id);
    res.json({
        message: 'User deleted Successfully'
    })
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    console.log("backend assigned to",user);
    return res.status(200).json({
        is_success: true,
        message: 'fetched the user',
        data: user
    })
});


module.exports = router;