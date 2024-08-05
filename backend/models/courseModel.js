const mongoose = require('mongoose');
const { description } = require('../schemas/courseSchema');

const coursemongooseschema = mongoose.Schema({
    tittle: {
        type: string,
        required: true,
    },
    description: {
        type:string,
        required: true,
    },
    courseid: {
        type: string,
        unique: true,
        required: true,
    },
    videoid: {
        type:string
    }
});

const course = mongoose.model('Course',coursemongooseschema);
mod