const router = require('express').Router()
const controller = require('../controller/CartController')
const authenticator = require('../../utils/middlewares/UserAuthenticator')

router.post('/add-to-cart',authenticator,controller.addToCart)

module.exports = router