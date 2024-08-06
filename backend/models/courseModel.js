const mongoose = require('mongoose');

const coursemongooseschema = mongoose.Schema({
    tittle: {
        type: String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
    videoId: {
        type:String
    }
});

const course = mongoose.model('Course',coursemongooseschema);
module.exports = course