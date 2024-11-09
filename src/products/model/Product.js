const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: String,
    },
    size: {
        required: true,
        type: [String],
    },
    availableQuantity: {
        type: Number,
        required: true
    },
    availableColors: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: false
    },
    categoryId: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Product', schema)