//Database Connection
const slugify = require("slugify")
const Blogs = require("../model/blogschema")
const {v4:uuidv4} = require("uuid")

//Save Data
exports.create = (req,res)=>{
    const {blog_type,title,content,author,file} = req.body
    let slug = slugify(title)
    
    if(!slug)slug = uuidv4();

    //Check Error
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหา"})
            break;
    }
    
    //Save Data
    Blogs.create({blog_type,title,content,author,file,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:'เกิดข้อผิดพลาด กรุณาลองใหม่'})
        }
        res.json(blog)
    })
}    

//Retrieve Data
exports.getAllblog=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}

//Single Blog
exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

//Remove Blog
exports.deleteBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message:"Delete Success"
        })
    })
}

//Update
exports.update=(req,res)=>{
    const {slug} = req.params
    const {blog_type,title,content,author}=req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
}