const authRouter = require('express').Router()
const authController = require('../controller/UserController')
const authenticator = require('../../utils/middlewares/UserAuthenticator')

authRouter.post('/sign-up',authController.registerUser)
authRouter.post('/sign-in',authController.signIn)
authRouter.post('/add-user-info',authenticator,authController.addUserInfo)
authRouter.post('/update-profile-picture',authenticator,authController.updateProfilePhoto)
authRouter.get('/profile',authenticator,authController.getUserProfile)
module.exports = authRouter