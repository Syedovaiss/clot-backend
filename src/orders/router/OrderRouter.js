const router = require('express').Router()
const controller = require('../controller/OrderController')
const authenticator = require('../../utils/middlewares/UserAuthenticator')

router.post('/place-order',authenticator,controller.placeOrder)
router.get('/orders',controller.getAllOrders)

module.exports = router