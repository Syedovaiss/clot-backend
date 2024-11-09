const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: async function (value) {
                const count = await mongoose.models.Category.countDocuments({ title: value });
                return count === 0;
            },
            message: 'Category already exists'
        }
    },
    description: {
        required: true,
        type: String
    },
    image: {
        required: false,
        type: String
    }
})
module.exports = mongoose.model('Category', schema)