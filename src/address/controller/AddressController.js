const Address = require('../model/Address')
const appHelper = require('../../utils/helpers/AppHelper')
const authHelper = require('../../utils/helpers/AuthHelper')

exports.addNewAddress = async (req, res) => {
    const { addressType, address } = req.body
    const token = req.header('Authorization')
    const userId = authHelper.getUserId(token)
    if (appHelper.isEmpty(addressType)) {
        return res.status(400).json({
            message: "Please provide address type!"
        })
    } else if (appHelper.isEmpty(address)) {
        return res.status(400).json({
            message: "Address can't be empty!"
        })
    } else {
        await Address.create({
            userId: userId,
            address: address,
            addressType: addressType
        }).then((data) => {
            return res.status(201).json({
                message: "New Address Added!",
                data: data
            })
        }).catch(error => {
            return res.status(400).json({
                message: error.message
            })
        })
    }
}

exports.getAllAddress = async (req, res) => {
    const token = req.header('Authorization')
    const userId = authHelper.getUserId(token)

    await Address
        .find({ userId: userId })
        .then((addresses) => {
            return res.status(200).json({
                data: addresses
            })
        }).catch(error => {
            return res.status(400).json({
                message: error.message
            })
        })
}