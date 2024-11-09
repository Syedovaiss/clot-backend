const appHelper = require('../../utils/helpers/AppHelper')
const Address = require('../../address/model/Address')
const Payment = require('../../payments/model/Payment')
const authHelper = require('../../utils/helpers/AuthHelper')
const Order = require('../model/Order')

exports.placeOrder = async (req, res) => {
    const { addressId, paymentId, cartItems, amount } = req.body
    if (appHelper.isEmpty(addressId)) {
        return res.status(400).json({
            message: "Address can't be empty!"
        })
    } else if (appHelper.isEmpty(paymentId)) {
        return res.status(400).json({
            message: "Payment Method can't be empty!"
        })
    } else if (cartItems.length == 0) {
        return res.status(400).json({
            message: "Please add cart items!"
        })
    } else if (amount.total <= 0) {
        return res.status(400).json({
            message: "Please recheck items!"
        })
    } else {
        const token = req.header('Authorization')
        const userId = authHelper.getUserId(token)
        const address = Address.findOne({ userId: userId, _id: addressId })
        if (!address) {
            return res.status(400).json({
                message: "User doesn't have this address saved!"
            })
        }
        const paymentMethod = Payment.findOne({ userId: userId, _id: paymentId })
        if (!paymentMethod) {
            return res.status(400).json({
                message: "User doesn't have this payment card saved"
            })
        }
        const newCartItems = []; 

        cartItems.forEach(element => {
            const newItem = {
                productId: element.productId,
                quantity: element.quantity,
                size: element.size,
                color: element.color
            };

            newCartItems.push(newItem);
        });

        await Order.create({
            userId: userId,
            addressId: addressId,
            paymentId: paymentId,
            cartItems: newCartItems,
            pricing: {
                subTotal: amount.subTotal,
                total: amount.total,
                shipping: amount.shippingFee,
                tax: amount.tax
            }
        }).then((order) => {
            return res.status(201).json({
                message: "Order placed!"
            })
        }).catch(error => {
            return res.status(400).json({
                message: error.message
            })
        })
    }
}