const authHelper = require('../../utils/helpers/AuthHelper')
const Product = require('../../products/model/Product')
const Wishlist = require('../../wishlist/model/Wishlist')

exports.addToWishlist = async (req, res) => {
    const token = req.header('Authorization')
    const userId = authHelper.getUserId(token)
    const productId = req.query.productId
    await Product.findOne({ _id: productId }).then(async (product) => {
        await Wishlist.create({
            userId: userId,
            productId: productId
        }).then(() => {
            return res.status(201).json({
                message: "Added to wishlist"
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

exports.removeFromWishList = async (req, res) => {
    const token = req.header('Authorization')
    const userId = authHelper.getUserId(token)
    const productId = req.query.productId
    await Wishlist.findOne({ userId: userId, productId: productId }).then((data) => {
        data.deleteOne().then(() => {
            return res.status(200).json({
                message: "Removed from wishlist"
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

exports.wishList = async (req, res) => {
    const token = req.header('Authorization')
    const userId = authHelper.getUserId(token)
    try {
        const wishlistItems = await Wishlist.find({ userId: userId });
        const productIds = wishlistItems.map(item => item.productId);
        const products = await Product.find({ '_id': { $in: productIds } });
        return res.status(200).json({
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            data: error.message
        });
    }
}