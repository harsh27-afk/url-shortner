const shortid=require("shortid");
const Url=require("../models/models.url")

async function handleGenerateShortUrl(req,res){
      const body=req.body;
      if( !body.url){
        res.status(400).json({err:"url required"});
      }

      const shortId=shortid(7);
      await Url.create({
         shortId:shortId,
         redirectURL:body.url,
         viewHistory:[]
      })

      return res.status(201).json({id:shortId});

}

async function handleGetAnalytics(req,res){
  const shortId=req.params.shortId;
  const result=await Url.findOne({shortId});
  return res.json({clicks:result.visitHistory.length})

}



module.exports={
    handleGenerateShortUrl,
    handleGetAnalytics
}