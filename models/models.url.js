const mongoose =require("mongoose");

const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[{timestamps:{type:Number}}],
    count:{
        type:Number
    }
}, { timestamps:true })

const Url=mongoose.model("url",urlSchema);

module.exports=Url;