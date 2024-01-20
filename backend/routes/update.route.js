/////////////////////// Import dependencies /////////////////////
const express = require('express');
const updateController = require('../controllers/update.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/get_bulk')
.post(
    authenticationController.authenticate,
    updateController.getBulk
);

router.route('/get')
.post(
    authenticationController.authenticate,
    updateController.get
);

router.route('/create')
.post(
    authenticationController.authenticate,
    updateController.create
);

router.route('/update')
.put(
    authenticationController.authenticate,
    updateController.update
);

router.route('/delete')
.delete(
    authenticationController.authenticate,
    updateController.delete
);
/////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////