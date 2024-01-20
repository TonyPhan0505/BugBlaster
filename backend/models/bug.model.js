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
    datetime: {
        type: Date,
        required: true
    },
    briefDescription: {
        type: String,
        required: true,
        trim: true
    },
    detailedDescription: {
        type: String,
        required: true,
        trim: true
    },
    assignees: {
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
        trim: true
    },
    teamId: {
        type: String,
        required: true,
        trim: true
    }
});
///////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Bug', BugSchema);
////////////////////////////////////////////////////