require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./src/user/router/UserRouter')
const categoryRouter = require('./src/categories/router/CategoryRouter')
const path = require('path')
const productRouter = require('./src/products/router/ProductRouter')
const addressRouter = require('./src/address/router/AddressRouter')
const paymentRouter = require('./src/payments/router/PaymentRouter')
const cartRouter = require('./src/cart/router/CartRouter')
const orderRouter = require('./src/orders/router/OrderRouter')
const wishlistRouter = require('./src/wishlist/router/WishlistRouter')
const searchRouter = require('./src/search/router/SearchRouter')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const database = mongoose.connection
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

database.on('error',(error) => {
    console.log(`Database Connection Failed because ${error}`)
})
database.on('connected',() => {
    console.log("Database Connected!")
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',userRouter)
app.use('/api',categoryRouter)
app.use('/api',productRouter)
app.use('/api',addressRouter)
app.use('/api',paymentRouter)
app.use('/api',cartRouter)
app.use('/api',orderRouter)
app.use('/api',wishlistRouter)
app.use('/api',searchRouter)

app.get('/',(req,res) => {
    res.send("Welcome to Clot")
})

// app.listen(process.env.PORT,() => {
//     console.log(`App running on PORT:${process.env.PORT}`)
// })
app.listen(4000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:4000');
});