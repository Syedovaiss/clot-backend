const router = require('express').Router()
const controller = require('../controller/SearchController')

router.get('/search',controller.searchProduct)

module.exports = router