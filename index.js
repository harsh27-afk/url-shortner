const express=require("express")
const {connectDB}=require("./connection.js")
const urlRouter=require("./routes/routes.url.js")
const Url=require("./models/models.url.js")
const app=express();

// connecting to database
connectDB("mongodb://localhost:27017/url")  // last wala is database name
.then(()=>console.log("database connected successfully"))
.catch((err)=>console.log("error while connecting to db: ", err))

//middlewares
app.use(express.json());


// Routes
app.use("/url",urlRouter);

app.get("/:shortId",async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await Url.findOneAndUpdate({
        shortId
    },{ 
        $push:{
            visitHistory:{
               timestamps:Date.now()
            }
        }
    })
    res.redirect(entry.redirectURL);
})

app.get("/analytics/:shortId",async (req,res)=>{
    const shortId=req.params.shortId;
      const result=await Url.findOne({shortId});
      return res.json({clicks:result.visitHistory.length})
      
      
})



const port=5000;

app.listen(port, ()=>{
    console.log(`server running on port: ${port}`);
})