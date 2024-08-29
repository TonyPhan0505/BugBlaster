///////////////////////////// Import dependencies ///////////////////////////////
const jwt = require('jsonwebtoken');
////////////////////////////////////////////////////////////////////////////////

/////////////////////// Callbacks //////////////////////////
exports.authenticate = (req, res, next) => {
    const accessToken = req.body.accessToken;
    jwt.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (err) => {
        if (err) {
            return res.status(400).json({ 
                success: false, 
                message: `Unauthorized access. ${err}.` 
            });
        } else {
            next();
        }
    });
};

exports.authenticateAdmin = (req, res, next) => {
    const accessToken = req.body.accessToken;
    jwt.verify(accessToken, process.env.ADMIN_LOGIN_SECRET_KEY, async (err) => {
        if (err) {
            return res.status(400).json({ 
                success: false, 
                message: `Unauthorized access. ${err}.` 
            });
        } else {
            next();
        }
    });
};
///////////////////////////////////////////////////////////