///////////////////////////// Import dependencies ///////////////////////////////
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Project = require('../models/project.model');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.login = (req, res) => {
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    Project.findOne({ emailAddress: emailAddress }).then(
        project => {
            if (!project || !project.comparePassword(password)) {
                return res.status(401).json({ success: false, message: 'Invalid email address or password.' });
            }
            try {
                const secretKey = process.env.LOGIN_SECRET_KEY;
                const accessToken = jwt.sign({ emailAddress: project.emailAddress }, secretKey);
                return res.status(200).json({ success: true, project: project, accessToken: accessToken });
            } catch (err) {
                return res.status(500).json({ success: false, message: `Server error when creating login token for project. ${err}.` });
            }
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to login project in. ${err}` });
        }
    );
};

exports.signUp = (req, res) => {
    const projectName = req.body.projectName;
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    const newProject = new Project({
        projectName: projectName,
        emailAddress: emailAddress,
        hashedPassword: bcrypt.hashSync(password, 10)
    });
    newProject.save().then(
        project => {
            const secretKey = process.env.LOGIN_SECRET_KEY;
            const accessToken = jwt.sign({ emailAddress: project.emailAddress }, secretKey);
            return res.status(200).json({ success: true, project: project, accessToken: accessToken });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to sign up project. ${err}` });
        }
    );
};
/////////////////////////////////////////////////////////////////////////