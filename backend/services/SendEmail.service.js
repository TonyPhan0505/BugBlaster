//////////////////////// Import dependencies ////////////////////////
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});
let mailOptions = {
    from: process.env.EMAIL,
    to: "",
    subject: "",
    text: ""
};
////////////////////////////////////////////////////////////////////

//////////////////////// Service ////////////////////////
module.exports = (to, subject, message) => {
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.text = message;
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Email sent: ${info.response}.`);
        }
    });
}
////////////////////////////////////////////////////////