const Product = require('../../products/model/Product')
const appHelper = require('../../utils/helpers/AppHelper')

let cartItems = [];
let cartItemTotal = 0

function addProduct(product, quantity) {
  cartItems.push({ product, quantity });
}

exports.addToCart = async (req, res) => {
    const response = {
        subTotal: 0,
        shippingFee: 100,
        total: 0,
        tax: 100
    }
    for(const cartItem of req.body) {
        await Product.findOne({ _id: cartItem.productId }).then((data) => {
            addProduct(data,cartItem.quantity)
            let price = appHelper.toPrice(data.price)
            const productPrice = price * cartItem.quantity
            response.subTotal += productPrice
        }).catch(error => {
            console.log(error)
        })
    }
    response.total = response.subTotal + response.tax + response.shippingFee
    cartItemTotal = response
    return res.status(200).json({
        total: response
    })
}

exports.getAllItems = async (req, res) => {
  if(cartItems.length === 0) {
    return res.status(200).json( {
        message:"Empty Cart!",
        data: []
    })
  } else {
    return res.status(200).json({
        message:"Cart Items",
        data: {
            products: cartItems,
            amount: cartItemTotal
        }
    })
  }
}