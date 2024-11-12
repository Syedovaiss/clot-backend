const appHelper = require('../../utils/helpers/AppHelper')
const Product = require('../../products/model/Product')
exports.searchProduct = async (req, res) => {
    const searchQuery = req.query.searchQuery
    if(appHelper.isEmpty(searchQuery)) {
        return res.status(400).json( {
            message: "Please enter a valid query!"
        })
    } else {
        let filter = {};
        filter = {
            $or: [
              { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive match for title
              { description: { $regex: searchQuery, $options: 'i' } } // Case-insensitive match for description
            ]
          };
        await Product.find(filter).then((product) => {
            return res.status(200).json({
                data: product
            })
        }).catch(error => {
            return res.status(400).json({
                message: error.message
            })
        })
    }
}