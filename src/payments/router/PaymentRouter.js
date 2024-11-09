const router = require('express').Router()
const controller = require('../controller/PaymentController')

router.post('/add-payment-method',controller.addPaymentMethod)
router.get('/payment-methods',controller.getPaymentMethods)
module.exports = router