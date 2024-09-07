/////////////////////// Import dependencies /////////////////////
const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project.controller');
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/login')
.post(projectController.login);

router.route('/sign_up')
.post(projectController.signUp);

router.route('/verify_access_token')
.post(projectController.verifyAccessToken);
/////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////