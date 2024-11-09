const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    userId: {
        required: true,
        type: String,
    },
    cardNumber: {
        required: true,
        type: Number,
        unique: true,
        validate: {
            validator: async function (value) {
                const count = await mongoose.models.Address.countDocuments({ cardNumber: value });
                return count === 0;
            },
            message: 'Card already exists'
        }
    },
    expiry: {
        required: true,
        type: String,
    },
    cardHolderName: {
        required: true,
        type: String
    },
    cardType: {
        required: true,
        type: String
    },
    cvv: {
        required: true,
        type: String
    }
})
module.exports = mongoose.model('Payment', schema)