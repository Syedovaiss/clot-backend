const mongoose = require('mongoose')
const itemsSchema = new mongoose.Schema( {
    productId: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number
    },
    size: {
        required: true,
        type: String
    },
    color: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: String,
    },
    image: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    title: {
        required: true,
        type: String,
    }
})

const pricingSchema = new mongoose.Schema( {
    subTotal: {
        required: true,
        type: Number
    },
    total: {
        required: true,
        type: Number
    },
    shipping: {
        required: true,
        type: Number
    },
    tax: {
        required: true,
        type: Number
    }
})
const schema = new mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    cartItems: {
        required: true,
        type: [itemsSchema]
    },
    pricing: {
        required:true,
        type:pricingSchema
    },
    addressId: {
        required: true,
        type: String
    },
    paymentId: {
        required: true,
        type: String
    }
})
module.exports = mongoose.model('Order', schema)