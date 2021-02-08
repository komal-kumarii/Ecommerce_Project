const mongoose = require('mongoose')
const Order_Schema = mongoose.Schema
const order_item = new Order_Schema({

    productName:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    Customer_name:{
        type:String,
        required:true
    },
    OrderDate:{
        type:Date,
        required:true
    }
})

module.exports  = order = mongoose.model('orders',order_item)