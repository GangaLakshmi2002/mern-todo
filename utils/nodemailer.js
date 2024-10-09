const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
})
const sendMail = (to, subject, html) => {
   const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to,
    subject,
    html
   };

   transporter.sendMail(mailOptions, (err, info) => {
    if(err){
        console.log("error sending in email", err)
    }
    else{
        console.log('Email sent', info.response);
    }
   })
};

module.exports = sendMail;