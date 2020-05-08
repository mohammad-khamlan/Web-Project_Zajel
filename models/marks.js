const mongoose = require('mongoose')

const marksSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    firstExam: {
        type: Number,
        required: false
    },
    secondExam: {
        type: Number,
        required: false
    },
    midtermExam: {
        type: Number,
        required: false
    },

    finalExam: {
        type: Number,
        required: true
    },

    assignments:{
        type: Number,
        required: false
    },

    courseMark: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Marks', marksSchema)

