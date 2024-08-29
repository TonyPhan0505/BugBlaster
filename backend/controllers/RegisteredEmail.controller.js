///////////////////////////// Import dependencies ///////////////////////////////
const RegisteredEmail = require('../models/RegisteredEmail.model');
////////////////////////////////////////////////////////////////////////////////

//////////////////////////// Callbacks //////////////////////////////
exports.register = async (req, res) => {
    const emailAddress = req.body.emailAddress;
    try {
        const existingOne = await RegisteredEmail.findOne({ emailAddress: emailAddress });
        if (existingOne) {
            return res.status(400).json({ 
                success: false, 
                message: "Email already registered." 
            });
        } else {
            const newEmail = new RegisteredEmail({
                emailAddress: emailAddress
            });
            await newEmail.save();
            return res.status(200).json({ 
                success: true, 
                message: "Registration was successful." 
            });
        }
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: `Failed to register email. ${err}` 
        });
    }
};

exports.remove = async (req, res) => {
    const emailAddress = req.body.emailAddress;
    try {
        await RegisteredEmail.deleteOne({ emailAddress: emailAddress });
        return res.status(200).json({ 
            success: true, 
            message: "Deletion was successful." 
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: `Deletion was not successful. ${err}` 
        });
    }
};
/////////////////////////////////////////////////////////////////