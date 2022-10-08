const express = require("express")
const router = express.Router()
const {create,getAllblog,singleBlog,deleteBlog,update} = require("../controllers/blogcontroller")
const {requireLogin} = require("../controllers/authcontroller")

router.post('/create',requireLogin,create)
router.get('/blogs',requireLogin,getAllblog)
router.get('/blog/:slug',requireLogin,singleBlog)
router.delete('/blog/:slug',requireLogin,deleteBlog)
router.put('/blog/edit/:slug',requireLogin,update)

module.exports = router