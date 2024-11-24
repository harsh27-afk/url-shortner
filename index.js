const express=require("express")
const {connectDB}=require("./connection.js")

const urlRouter=require("./routes/routes.url.js")
const staticRouter=require("./routes/staticRouter.js")
const userRouter=require("./routes/user.js")

const Url=require("./models/models.url.js")
const path=require("path")
const app=express();

// connecting to database
connectDB("mongodb://localhost:27017/url")  // last wala is database name
.then(()=>console.log("database connected successfully"))
.catch((err)=>console.log("error while connecting to db: ", err))

// templating engine settings for ssr
app.set("view engine", "ejs")
app.set("views",path.resolve("./views"))

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// Routes



app.use("/url",urlRouter);

app.use("/",staticRouter);

app.use("/user",userRouter)


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
    if (entry && entry.redirectURL) {
        return res.redirect(entry.redirectURL);
    } else {
        return res.status(404).send("Entry not found.");
    }
})




// port defined
const port=5000;

app.listen(port, ()=>{
    console.log(`server running on port: ${port}`);
})