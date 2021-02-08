const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sellerSchema = new Schema({
    seller_name:{
        type:String,
        required:true
    }
})
module.exports = item = mongoose.model('sellers',sellerSchema)