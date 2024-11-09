const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    userId: {
        required: true,
        type: String,
    },
    productId: {
        required: true,
        type: String,
    }
})
module.exports = mongoose.model('Wishlist', schema)