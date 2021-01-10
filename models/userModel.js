const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const schema  = mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    userID:ObjectID
}, {autoIndex:false})


module.exports = mongoose.model('users', schema);