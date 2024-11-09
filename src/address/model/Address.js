const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    userId: {
        required: true,
        type: String,
    },
    addressType: {
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: async function (value) {
                const count = await mongoose.models.Address.countDocuments({ addressType: value });
                return count === 0;
            },
            message: 'Address already exists'
        }
    },
    address: {
        required: true,
        type: String
    }
})
module.exports = mongoose.model('Address', schema)