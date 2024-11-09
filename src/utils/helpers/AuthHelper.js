const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SALT_ROUNDS = 10
module.exports = {

    generatePassword: (password) => {
        return bcrypt.hashSync(password, SALT_ROUNDS)
    },

    comparePassword: (password, hash) => {
        return bcrypt.compareSync(password, hash)
    },
    isValidEmail: (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    },
    isValidPassword: (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        return passwordRegex.test(password)
    },
    isValidPhone: (phone) => {
        const phoneRegex = /^03\d{9}$/;
        return phoneRegex.test(phone)
    },
    getUserId: (headerToken) => {
        const token = headerToken?.replace('Bearer ', '');
        if (!token) {
            return ""
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId;
    }
}