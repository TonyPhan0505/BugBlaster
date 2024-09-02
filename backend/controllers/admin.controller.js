///////////////////////////// Import dependencies ///////////////////////////////
const bcrypt = require('bcrypt');

const Admin = require('../models/admin.model');
////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.login = async (req, res) => {
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    try {
        const admin = await Admin.findOne({ emailAddress: emailAddress });
        if (!admin || !admin.comparePassword(password)) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email address or password."
            });
        } else {
            const secretKey = process.env.ADMIN_LOGIN_SECRET_KEY;
            const accessToken = jwt.sign({ emailAddress: emailAddress }, secretKey);
            return res.status(200).json({ 
                success: true, 
                accessToken: accessToken 
            });
        }
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: `Server error when creating login token for admin. ${err}.` 
        });
    }
};

exports.signUp = async (req, res) => {
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    try {
        const newAdmin = new Admin({
            emailAddress: emailAddress,
            hashedPassword: bcrypt.hashSync(password, 10)
        });
        await newAdmin.save();
        return res.status(200).json({
            success: true,
            message: "Successfully created admin account."
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: `Server error when creating admin account. ${err}.` 
        });
    }
};
/////////////////////////////////////////////////////////////////////////