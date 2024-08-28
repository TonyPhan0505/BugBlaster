/////////////////////// Import dependencies /////////////////////
const express = require('express');
const router = express.Router();

const bugController = require('../controllers/bug.controller');
const authenticationController = require('../controllers/authentication.controller');
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/get_bulk')
.post(
    authenticationController.authenticate,
    bugController.getBulk
);

router.route('/create')
.post(
    authenticationController.authenticate,
    bugController.create
);

router.route('/update')
.put(
    authenticationController.authenticate,
    bugController.update
);

router.route('/delete')
.delete(
    authenticationController.authenticate,
    bugController.delete
);
/////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////