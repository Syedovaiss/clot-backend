const Product = require('../model/Product')
const appHelper = require('../../utils/helpers/AppHelper')
const imageConfig = require('../../utils/image_config/ImageConfig')
const path = require('path')

exports.addProduct = async (req, res) => {
    const { title, description, price, size, availableQuantity, availableColors } = req.body
    const categoryId = req.query.categoryId
    if (appHelper.isEmpty(title)) {
        return res.status(400).json({
            message: "Title can't be empty!"
        })
    } else if (appHelper.isEmpty(description)) {
        return res.status(400).json({
            message: "Description can't be empty!"
        })
    } else if (appHelper.isEmpty(price)) {
        return res.status(400).json({
            message: "Price can't be empty!"
        })
    } else if (appHelper.isEmpty(size)) {
        return res.status(400).json({
            message: "Size can't be empty!"
        })
    } else if (appHelper.isEmpty(availableQuantity)) {
        return res.status(400).json({
            message: "Available quantiy can't be empty!"
        })
    } else if (appHelper.isEmpty(availableColors)) {
        return res.status(400).json({
            message: "Available colors can't be empty!"
        })
    } else if (appHelper.isEmpty(categoryId)) {
        return res.status(400).json({
            message: "Please provide category"
        })
    } else {
        await Product.create({
            title: title,
            description: description,
            price: appHelper.toPriceString(price),
            size: size.toString().split(','),
            availableQuantity: availableQuantity,
            availableColors: availableColors.toString().split(','),
            categoryId: categoryId
        }).then((product) => {
            return res.status(201).json({
                message: "Product Created",
                data: product
            })
        }).catch(error => {
            return res.status(400).json({
                message: `Error while creating product: ${error.message}`
            })
        })
    }
}

exports.addProductImage = async (req, res) => {
    const productId = req.query.productId
    console.log(productId);
    imageConfig.upload(req, res, async (error) => {
        if (error) {
            return res.status(400).json({
                message: "Something went wrong while saving image."
            })
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        const filePath = path.join('uploads', req.file.filename);
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                { image: filePath },
                { new: true }
            );
            if (!updatedProduct) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            return res.status(201).json({
                message: "Image Uploaded!",
                data: updatedProduct
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Something goes wrong"
            })
        }
    })
}

exports.getProductByCategoryId = async (req, res) => {
    const categoryId = req.query.categoryId
    await Product.find( {categoryId: categoryId}).then((products) => {
       return res.status(200).json({
            message: "Products",
            data: products
        })
    }).catch(error => {
        return res.status(500).json( {
            message: error.message
        })
    })
}

exports.getLastTenProducts = async(req,res) => {
    await Product.find().limit(10).then((data) => {
        return res.status(200).json({
            data: data
        })
    }).catch(error => {
        return res.status(400).json({
            message: error.message
        })
    })
}