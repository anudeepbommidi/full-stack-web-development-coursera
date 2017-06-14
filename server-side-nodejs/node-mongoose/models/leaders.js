var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var leaderSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

});

var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;   