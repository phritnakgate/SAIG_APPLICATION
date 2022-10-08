const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required:true
    },
    password:{
        type: String,
        required:true
    }
}, {timestamps: true})

module.exports = mongoose.model("User",userschema)