const mongoose = require('mongoose')

const ScoreSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    time: {
        type: Number,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model('Score', ScoreSchema)