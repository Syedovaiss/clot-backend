const Category = require('../model/Category')
const imageConfig = require('../../utils/image_config/ImageConfig')
const appHelper = require('../../utils/helpers/AppHelper')
const path = require('path')

exports.addCategory = async (req, res) => {
    const { title, description } = req.body;
    if (appHelper.isEmpty(title)) {
        return res.status(400).json({
            message: "Title can't be empty!"
        })
    } else if (appHelper.isEmpty(description)) {
        return res.status(400).json({
            message: "Description can't be empty!"
        })
    } else {
        await Category.create({
            title: title,
            description: description
        }).then((category) => {
            return res.status(201).json({
                message: "Category Created!",
                data: category
            })
        }).catch(error => {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    message: "Category Already Exists!"
                })
            } else {
                return res.status(500).json({
                    message: error.message
                })
            }
        })
    }
}

exports.addCategoryImage = async (req, res) => {
    const categoryId = req.query.categoryId
    console.log(categoryId);
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
            const updatedCategory = await Category.findByIdAndUpdate(
                categoryId,           
                { image: filePath },  
                { new: true }          
            );
            if (!updatedCategory) {
                return res.status(404).json({
                    message: "Category not found"
                });
            }

            return res.status(201).json({
                message: "Image Uploaded!",
                data: updatedCategory 
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Something goes wrong"
            })
        }
    })
}
exports.getAllCategories = async (req,res) => {
    await Category.find().then((categories) => {
        if(categories) {
            return res.status(200).json( {
                message: "Results!",
                data: categories
            })
        } else {
            return res.status(400).json( {
                message: "No category found!"
            })
        }
    }).catch(error => {
        return res.status(500).json({
            message: `Something went wrong: ${error.message}`,
        })
    })
}