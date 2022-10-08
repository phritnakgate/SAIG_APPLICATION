const jwt = require("jsonwebtoken")
const { expressjwt } = require("express-jwt")
const User = require("../model/userschema")
const bcrypt = require("bcryptjs")

exports.login=(req,res)=>{
    const {username,password} = req.body
    
    User.findOne({
        username: req.body.username
    }).exec((err,user)=>{
        if(err){
            res.status(500).send({message: err});
            return;
        }
        
        if(!user) {
            return res.status(404).send({message: "Username Error"});
        }else{
            var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid){
            return res.status(401).send({message: "Password Error"});
        }else{
            const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
            return res.json({token,username})
        }
    }

    })
    
    //ADMIN
    if(password === process.env.PASSWORD && username === process.env.ADMIN_USERNAME){
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})
    }
    else{
     res
        .status(400)
        .json({error:"Username or Password Incorrect!"})
   }
}

//ตรวจสอบ token
exports.requireLogin = expressjwt({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty:"auth"
})