//ต้องการจัดเก็บ เจ้าของ,เนื้อหา,slug(url),timestamp
const mongoose = require("mongoose")

const blogschema = mongoose.Schema({
    blog_type:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:{},
        required:true
    },
    author:{
        type:String,
        default:"User"
    },
    file:{
        type:String
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    } 
},{timestamps:true})

module.exports = mongoose.model("Blogs",blogschema)