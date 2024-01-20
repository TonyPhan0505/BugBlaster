///////////////////////////// Import dependencies ///////////////////////////////
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Team = require('../models/team.model');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.login = (req, res) => {
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    Team.findOne({ emailAddress: emailAddress }).then(
        team => {
            if (!team || !team.comparePassword(password)) {
                return res.status(401).json({ success: false, message: 'Invalid email address or password.' });
            }
            try {
                const secretKey = process.env.LOGIN_SECRET_KEY;
                const accessToken = jwt.sign({ emailAddress: team.emailAddress }, secretKey, { expiresIn: '24h' });
                return res.status(200).json({ success: true, team: team, accessToken: accessToken });
            } catch (err) {
                return res.status(500).json({ success: false, message: `Server error when creating login token for team. ${err}.` });
            }
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to login team in. ${err}` });
        }
    );
};

exports.signUp = (req, res) => {
    const teamId = req.body.teamId;
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    const newTeam = new Team({
        id: teamId,
        emailAddress: emailAddress,
        hashedPassword: bcrypt.hashSync(password, 10)
    });
    newTeam.save().then(
        team => {
            const secretKey = process.env.LOGIN_SECRET_KEY;
            const accessToken = jwt.sign({ emailAddress: team.emailAddress }, secretKey, { expiresIn: '24h' });
            return res.status(200).json({ success: true, team: team, accessToken: accessToken });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to sign up team. ${err}` });
        }
    );
};
/////////////////////////////////////////////////////////////////////////