const Product = require('../../products/model/Product')
const appHelper = require('../../utils/helpers/AppHelper')

let cartItems = [];
let cartItemTotal = {}

function addProduct(product, quantity,color,size) {
    let productAdded = {
        title: product.title,
        description: product.description,
        quantity: quantity,
        image: product.image,
        color: color,
        size: size,
        id: product._id,
        price: product.price
    }
    cartItems.push(productAdded);
}

function updateCartTotal() {
    let subTotal = 0;
    for (const cartItem of cartItems) {
        let price = appHelper.toPrice(cartItem.price);
        subTotal += price * cartItem.quantity;
    }

    cartItemTotal.subTotal = subTotal;
    cartItemTotal.shippingFee = 100;
    cartItemTotal.tax = 100;
    cartItemTotal.total = subTotal + cartItemTotal.tax + cartItemTotal.shippingFee;
}


exports.addToCart = async (req, res) => {
    const response = {
        subTotal: 0,
        shippingFee: 100,
        total: 0,
        tax: 100
    }
    for (const cartItem of req.body) {
        await Product.findOne({ _id: cartItem.productId }).then((data) => {
            addProduct(data, cartItem.quantity,cartItem.color,cartItem.size)
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
    if (cartItems.length === 0) {
        return res.status(200).json({
            message: "Empty Cart!",
            data: []
        })
    } else {
        return res.status(200).json({
            message: "Cart Items",
            data: {
                products: cartItems,
                amount: cartItemTotal
            }
        })
    }
}

exports.incrementItem = async (req, res) => {
    const { productId } = req.query;
    let itemUpdated = false;

    for (let cartItem of cartItems) {
        if (cartItem.id.toString() === productId) {
            cartItem.quantity += 1;
            itemUpdated = true;
            break;
        }
    }

    if (!itemUpdated) {
        return res.status(400).json({ message: 'Product not found in the cart' });
    }

    updateCartTotal();

    return res.status(200).json({
        message: "Item incremented successfully",
        data: {
            products: cartItems,
            amount: cartItemTotal
        }
    });
}


exports.decrementItem = async (req, res) => {
    const { productId } = req.query;
    let itemUpdated = false;

    for (let cartItem of cartItems) {
        if (cartItem.id.toString() === productId) {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else {
                return res.status(400).json({ message: 'Quantity cannot be less than 1' });
            }
            itemUpdated = true;
            break;
        }
    }

    if (!itemUpdated) {
        return res.status(400).json({ message: 'Product not found in the cart' });
    }
    updateCartTotal();

    return res.status(200).json({
        message: "Item decremented successfully",
        data: {
            products: cartItems,
            amount: cartItemTotal
        }
    });
}

exports.removeAllItems = async (req, res) => {
    cartItems = []
    cartItemTotal = {}
    return res.status(200).json({
        message: "All Items Cleared",
        data: []
    })
}