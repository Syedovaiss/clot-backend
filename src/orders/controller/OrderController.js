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
        console.log(req.body)
        const newCartItems = [];
        cartItems.forEach(element => {
            const newItem = {
                productId: element._id,
                quantity: element.quantity,
                size: element.size,
                color: element.color,
                image: element.image,
                title: element.title,
                description: element.description,
                price: element.price
            };

            newCartItems.push(newItem);
        });
        console.log("New Cart Items")
        console.log(newCartItems)

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
                message: "Order placed!",
                order: order
            })
        }).catch(error => {
            return res.status(400).json({
                message: error.message
            })
        })
    }
}

exports.getAllOrders = async(req,res) => {
    const token = req.header('Authorization')
    const userId = authHelper.getUserId(token)
    await Order.find({userId:userId}).then(async(order) => {
        await Address.findOne({addressId:order.addressId}).then(async(addressDTO) => {
            await Payment.findOne({paymentId: order.paymentId}).then(paymentDto => {
                return res.status(200).json({
                    data: order,
                    shippingAddress: addressDTO.address,
                    paymentInfo: {
                        cardNumber: appHelper.maskCardNumber(paymentDto.cardNumber),
                        cardType: paymentDto.cardType,
                        cardHolderName: paymentDto.cardHolderName
                    }
                })
            }).catch(error => {
                return res.status(400).json({
                    message: error.message
                })
            })
        
        }).catch(error => {
            return res.status(400).json({
                message: error.message
            })
        })

    }).catch(error => {
        return res.status(400).json({
            message: error.message
        })
    })
}