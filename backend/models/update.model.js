////////////// Import dependencies ///////////////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////////////

////////////// Database schema /////////////
const UpdateSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    datetime: {
        type: Date,
        required: true
    },
    details: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    bugId: {
        type: String,
        required: true,
        trim: true
    },
    projectName: {
        type: String,
        required: true,
        trim: true
    }
});
///////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Update', UpdateSchema);
////////////////////////////////////////////////////