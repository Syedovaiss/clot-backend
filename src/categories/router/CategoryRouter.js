const express = require('express')
const router = express.Router()
const controller = require('../controller/CategoryController')

router.post('/add-category',controller.addCategory)
router.post('/add-category-image',controller.addCategoryImage)
router.get('/categories',controller.getAllCategories)
module.exports = router