////////////// Import dependencies ///////////////
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
////////////////////////////////////////////////

////////////// Database schema /////////////
const AdminSchema = new Schema({
    emailAddress: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function(value) {
              return value === process.env.ADMIN_EMAIL_ADDRESS;
            },
            message: `Email must be ${process.env.ADMIN_EMAIL_ADDRESS}`
        }
    },
    hashedPassword: {
        type: String,
        required: true,
        trim: true
    }
});
///////////////////////////////////////////

//////////// compare raw password with its hashed version //////////
AdminSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.hashedPassword);
};
///////////////////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Admin', AdminSchema);
////////////////////////////////////////////////////