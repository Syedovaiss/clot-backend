const appHelper = require('../../utils/helpers/AppHelper')
const authHelper = require('../../utils/helpers/AuthHelper')
const Payment = require('../model/Payment')


exports.addPaymentMethod = async (req, res) => {
    const { cardHolderName, cardNumber, expiry, cvv } = req.body
    const token = req.header('Authorization')
    const userId = authHelper.getUserId(token)
    if (appHelper.isEmpty(cardHolderName)) {
        return res.status(400).json({
            messaging: "Card holder name can't be empty!"
        })
    } else if (appHelper.isEmpty(cardNumber)) {
        return res.status(400).json({
            messaging: "Card number can't be empty!"
        })
    } else if (appHelper.isEmpty(expiry)) {
        return res.status(400).json({
            messaging: "Card expiry can't be empty!"
        })
    } else if (appHelper.isEmpty(cvv) || cvv.length > 3) {
        return res.status(400).json({
            messaging: "Please enter a valid cvv"
        })
    } else {
        const cardType = appHelper.getCardType(cardNumber)
        await Payment.create({
            userId: userId,
            cardNumber: cardNumber,
            expiry: expiry,
            cardHolderName: cardHolderName,
            cardType: cardType,
            cvv: cvv
        }).then(() => {
            return res.status(201).json({
                message: "Card Added"
            })
        }).catch(error => {
            return res.status(400).json({
                message: error.message
            })
        })

    }
}


exports.getPaymentMethods = async (req, res) => {
    const token = req.header('Authorization')
    const userId = authHelper.getUserId(token)

    await Payment.find({userId: userId}).then((payments) => {
        const formattedPayments = payments.map(payment => {
            const { userId,__v, ...paymentData } = payment._doc;
            return {
              ...paymentData,                     
              cardNumber: appHelper.maskCardNumber(paymentData.cardNumber)
            };
          });
        return res.status(200).json({
            data: formattedPayments
        })
    }).catch(error => {
        return res.status(400).json({
            data: error.message
        })
    })
}