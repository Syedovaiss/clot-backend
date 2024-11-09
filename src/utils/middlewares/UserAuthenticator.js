const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userData = decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({
            message: "Authentication Failed!"
        })
    }



}