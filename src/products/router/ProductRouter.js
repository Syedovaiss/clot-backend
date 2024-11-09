const router = require('express').Router()
const controller = require('../controller/ProductController')

router.post('/add-product',controller.addProduct)
router.post('/add-product-image',controller.addProductImage)
router.get('/products',controller.getProductByCategoryId)
router.get('/last-ten-products',controller.getLastTenProducts)

module.exports = router