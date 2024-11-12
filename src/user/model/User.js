const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
    },
    gender: {
        required: true,
        type: String,
    },
    age: {
        type: Number,
        required: false
    },
    clothesPriorityFor: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: false
    }
})
module.exports = mongoose.model('User', schema)