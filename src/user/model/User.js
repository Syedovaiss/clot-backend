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
        unique: true,
        validate: {
            validator: async function (value) {
                const count = await mongoose.models.User.countDocuments({ email: value });
                return count === 0;
            },
            message: 'Email already exists'
        }
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
        unique: true,
        validate: {
            validator: async function (value) {
                const count = await mongoose.models.User.countDocuments({ phoneNumber: value });
                return count === 0;
            },
            message: 'Phone already exists'
        }
    }
})
module.exports = mongoose.model('User', schema)