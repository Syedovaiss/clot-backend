const router = require('express').Router()
const controller = require('../controller/AddressController')
const authenticator = require('../../utils/middlewares/UserAuthenticator')

router.post('/add-address', authenticator, controller.addNewAddress)
router.get('/address', authenticator, controller.getAllAddress)

module.exports = router