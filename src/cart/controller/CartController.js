const Product = require('../../products/model/Product')
const appHelper = require('../../utils/helpers/AppHelper')
exports.addToCart = async (req, res) => {
    const response = {
        subTotal: 0,
        shippingFee: 100,
        total: 0,
        tax: 100
    }
    for(const cartItem of req.body) {
        await Product.findOne({ _id: cartItem.productId }).then((data) => {
            let price = appHelper.toPrice(data.price)
            const productPrice = price * cartItem.quantity
            response.subTotal += productPrice
        }).catch(error => {
            console.log(error)
        })
    }
    response.total = response.subTotal + response.tax + response.shippingFee
    return res.status(200).json({
        total: response
    })
}