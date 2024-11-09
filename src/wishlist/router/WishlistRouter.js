const router = require('express').Router()
const controller = require('../controller/WishlistController')
router.post('/add-to-wishlist',controller.addToWishlist)
router.delete('/remove-from-wishlist',controller.removeFromWishList)
router.get('/wishlist',controller.wishList)
module.exports = router