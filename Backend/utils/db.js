const mongoose = require('mongoose');

const MongoDB = async()=>{
    await mongoose.connect("mongodb://localhost:27017/rolebasedauth")
    .then(()=>{
        console.log("Connected to MongoDB");
    })
}

module.exports = MongoDB;