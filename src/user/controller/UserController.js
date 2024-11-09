const authHelper = require('../../utils/helpers/AuthHelper')
const appHelper = require('../../utils/helpers/AppHelper')
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const path = require('path')
const imageConfig = require('../../utils/image_config/ImageConfig')

exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, gender, password, phoneNumber } = req.body
    if (appHelper.isEmpty(firstName)) {
        return res.status(400).json({
            message: "First name can't be empty!"
        })
    } else if (appHelper.isEmpty(lastName)) {
        return res.status(400).json({
            message: "Last name can't be empty!"
        })
    } else if (appHelper.isEmpty(email) || !authHelper.isValidEmail(email)) {
        return res.status(400).json({
            message: "Please provide a valid email address!"
        })
    } else if (appHelper.isEmpty(gender)) {
        return res.status(400).json({
            message: "Please provide a valid gender!"
        })
    } else if (appHelper.isEmpty(password)) {
        return res.status(400).json({
            message: "Password can't be empty!"
        })
    } else if (!authHelper.isValidPassword(password)) {
        return res.status(400).json({
            message: "Password must contains 1 uppercase, 1 lowercase, 1 special character and atleast 9 characters long!"
        })
    } else if (appHelper.isEmpty(phoneNumber)) {
        return res.status(400).json({
            message: "Phone can't be empty!"
        })
    } else if (!authHelper.isValidPhone(phoneNumber)) {
        return res.status(400).json({
            message: "Phone must starts with 03 and must have 11 digits"
        })
    } else {
        const passwordHash = authHelper.generatePassword(password)
        try {
            const data = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                gender: gender,
                password: passwordHash
            })
            const savedUser = await data.save()
            return res.status(201).json({
                message: `User Created! for ${savedUser.firstName}`
            })
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    message: error.message
                })
            } else {
                return res.status(400).json({
                    message: "Error while creating User!",
                    detailedMessage: error.message
                })
            }

        }
    }
}

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!authHelper.isValidEmail(email)) {
        return res.status(400).json({
            message: "Please enter a valid email!"
        })
    } else if (!authHelper.isValidPassword(password)) {
        return res.status(400).json({
            message: "Please enter a valid password!"
        })
    } else {
        try {
            const user = await User.findOne({ email })
            if (user) {
                const passwordHash = user.password
                const isMatch = authHelper.comparePassword(password, passwordHash)
                if (isMatch) {
                    const token = jwt.sign(
                        {
                            firstName: user.firstName,
                            userId: user._id
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '15d'
                        }
                    )

                    return res.status(200).json({
                        message: "Logged In!",
                        accessToken: token
                    })
                } else {
                    return res.status(400).json({
                        message: "Please enter a valid password!"
                    })
                }
            } else {
                return res.status(400).json({
                    message: "No User Found!"
                })
            }
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}

exports.addUserInfo = async (req, res) => {
    const token = req.header('Authorization')
    const userId = authHelper.getUserId(token)
    const { age, interestedIn } = req.body;
    await User.updateOne(
        { _id: userId }, { $set: { age: age, clothesPriorityFor: interestedIn } }
    ).then((data) => {
        console.log(`User updated!:${userId}`)
        return res.status(201).json({
            message: "Info updated successfully!",
            data: data
        })
    }).catch(error => {
        return res.status(400).json({
            message: error.message
        })
    })
}

exports.updateProfilePhoto = async (req,res) => {
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
        // Save the file path in the database
        try {
            const token = req.header('Authorization')
            const userId = authHelper.getUserId(token)
            await User.updateOne(
                { _id: userId }, { $set: { avatar: filePath } }
            ).then(() => {
                return res.status(201).json({
                    message: "Image Uploaded Successfully!"
                })
            }).catch(error => {
                return res.status(500).json({
                    message: error.message
                })
            })
        } catch (err) {
            res.status(500).json({ error: 'Failed to save image in database.', details: err });
        }
    })
} 

exports.getUserProfile = async(req,res) => {
    const token = req.header('Authorization')
    const userId = authHelper.getUserId(token)
    await User.findById(userId).then((user) => {
        return res.status(200).json( {
            firstName: user.firstName,
            lastName:user.lastName,
            age: user.age,
            avatar:user.avatar,
            phoneNumber:user.phoneNumber,
            email:user.email,
            clothesPriority: user.clothesPriorityFor,
            gender:user.gender
        })
    }).catch(error => {
        res.status(500).json({
            message: error.message
        })
    })
}