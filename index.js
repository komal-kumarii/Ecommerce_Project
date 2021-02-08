const express = require('express')
const app = express()
app.use(express.json())
const port = 8000
const connect = require('./connection/connect')
let datetime = require('node-datetime');

// for users login signup
const userdb = require('./model/userSchema')

// Schema for product posting on flipkart
const productdb = require('./model/productSchema')

// Schema for ordering some products
const orderdb = require('./model/orderSchema')

// Schema for sellers name
const sellerdb = require('./model/sellerSchema')

// Schema for delivered products
const deliverydb = require('./model/deliverySchema')

// Schema for adding products in the carts
const AddToCarts = require('./model/addToCartSchema')

// used jwt for users authentrications
const jwt = require('jsonwebtoken')

// 
const customer = express.Router();
app.use('/',customer) 
require('./routes/customer')(customer,userdb,jwt)

const product = express.Router()
app.use('/',product)
require('./routes/product')(product,productdb,sellerdb)


// making or placing orders of product
const order = express.Router()
app.use('/',order)
require('./routes/order')(order,orderdb,deliverydb,datetime,userdb)


// adding , removing products from the cart
const addCart = express.Router()
app.use('/',addCart)
require('./routes/AddCart')(AddToCarts,addCart,productdb,orderdb,datetime)


// showing totaL ORDERS  as according to users name
const TotalOrders = express.Router()
app.use('/',TotalOrders)
require('./routes/TotalOrder')(orderdb,userdb,TotalOrders)

// server is being working on 8000 port no,
app.listen(port,()=>{
    console.log('server is being started on ', port)
})