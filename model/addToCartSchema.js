const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    Customer_name:{
        type:String,
        required:true
    },
    seller:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

module.exports = item = mongoose.model('add_to_carts',itemSchema)