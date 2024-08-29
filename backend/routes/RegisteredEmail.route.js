/////////////////////// Import dependencies /////////////////////
const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers/authentication.controller');
const registeredEmailController = require('../controllers/RegisteredEmail.controller');
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/register')
.post(
    authenticationController.authenticateAdmin,
    registeredEmailController.register
);

router.route('/remove')
.post(
    authenticationController.authenticateAdmin,
    registeredEmailController.remove
);
/////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////