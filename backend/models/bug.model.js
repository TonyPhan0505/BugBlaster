////////////// Import dependencies ///////////////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////////////

////////////// Database schema /////////////
const BugSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fixed: {
        type: Boolean,
        required: true,
        default: false
    },
    datetime: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    detailedDescription: {
        type: String,
        required: true,
        trim: true
    },
    updates: {
        type: [String],
        required: true,
        default: []
    },
    solution: {
        type: String,
        required: false,
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
module.exports = mongoose.model('Bug', BugSchema);
////////////////////////////////////////////////////