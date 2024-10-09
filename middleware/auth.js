const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (roles = []) => {
     return async(req, res, next) => {
        try {
            const token = req.header('Authorization').split(' ')[1];
            // const token = req.header('Authorization');

            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decoded", decoded); 
            const user = await User.findById(decoded.id);
            console.log("user", user);
           

            if(!user || !roles.includes(user.role)){
                return res.status(404).json({
                    is_success: false,
                    message: 'Access Denied'
                })
            }
            req.user = user;
            next();
        } catch (error) {
            console.log("error", error)
           return res.status(500).json({
            is_success: false,
            message: 'Unauthorized access'
           }) 
        }
     };
};

module.exports = auth;