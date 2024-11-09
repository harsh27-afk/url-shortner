const mongoose=require("mongoose")
const express=require("express");
const {handleGenerateShortUrl}=require("../controllers/controllers.url")
const router=express.Router();

router.post("/",handleGenerateShortUrl);

module.exports=router;