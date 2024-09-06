////////////// Import dependencies ///////////////
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
////////////////////////////////////////////////

////////////// Database schema /////////////
const ProjectSchema = new Schema({
    uniqueName: {
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
    },
    link: {
        type: String,
        required: false,
        trim: true
    }
});
///////////////////////////////////////////

//////////// compare raw password with its hashed version //////////
ProjectSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.hashedPassword);
};
///////////////////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Project', ProjectSchema);
////////////////////////////////////////////////////