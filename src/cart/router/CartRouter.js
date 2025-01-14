const router = require('express').Router()
const controller = require('../controller/CartController')
const authenticator = require('../../utils/middlewares/UserAuthenticator')

router.post('/add-to-cart',authenticator,controller.addToCart)
router.get('/cart',authenticator,controller.getAllItems)
router.delete('/cart/clear',authenticator,controller.removeAllItems)
router.get('/cart/increase-item',authenticator,controller.incrementItem)
router.get('/cart/decrease-item',authenticator,controller.decrementItem)

module.exports = router