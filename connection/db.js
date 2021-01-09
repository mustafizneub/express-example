const mongoose = require('mongoose');

// set your database string below empty string
var url = ''
const connectDB = async ()=>{
    await mongoose.connect(url,{useUnifiedTopology:true, useNewUrlParser:true}).then(value=>{
        console.log('connected')
    })
}

module.exports = connectDB;