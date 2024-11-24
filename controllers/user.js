const User=require("../models/models.user")

async function handleUserSignUp(req,res){
    const{name,email,password}=req.body;
    await User.create({       
        name,              // i dont need to specify ki name:req.body.name
        email,             // cause sign up form me i am passing name attributes for name , email and password so wo automatically input filed k value ko name wale attibute se k:v pair 
        password
    })

    return res.redirect("/")
}

async function handleUserLogin(req,res){
    const{name,email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user){
        return res.render("login",{
            error:"invalid Username or Password"
        })
    }
    return res.redirect("/")
}

module.exports={
    handleUserSignUp,
    handleUserLogin
}