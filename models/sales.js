const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const products = mongoose.Schema({
    name:{type:String, required:true},
    quantity:{type:String,required:true},
    price:{type:Number, required:true}
},{_id:false})

const saleSchema = mongoose.Schema({
    email:{type:String, required:true},
    products:[products],
    total:Number,
    doc:ObjectID
},{autoIndex:false})
module.exports = mongoose.model('sales', saleSchema)

