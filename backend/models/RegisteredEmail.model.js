////////////// Import dependencies ///////////////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////////////

////////////// Database schema /////////////
const RegisteredEmailSchema = new Schema({
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});
///////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('RegisteredEmail', RegisteredEmailSchema);
////////////////////////////////////////////////////