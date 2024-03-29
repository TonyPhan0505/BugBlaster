////////////// Import dependencies ///////////////
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
////////////////////////////////////////////////

////////////// Database schema /////////////
const TeamSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    emailAddress: {
        type: String,
        required: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true,
        trim: true
    }
});
///////////////////////////////////////////

//////////// compare raw password with its hashed version //////////
TeamSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.hashedPassword);
};
///////////////////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Team', TeamSchema);
////////////////////////////////////////////////////