const mongoose=require("mongoose")
const express=require("express");
const {handleGenerateShortUrl,
       handleGetAnalytics
}=require("../controllers/controllers.url")

const router=express.Router();

router.post("/",handleGenerateShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports=router;