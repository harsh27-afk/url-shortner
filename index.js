const express=require("express")
const {connectDB}=require("./connection.js")
const {urlRouter}=require("./routes/routes.url.js")
const app=express();

// connecting to database
connectDB("http://localhost:27017/url")  // last wala is database name
.then(()=>console.log("database connected successfully"))
.catch(()=>console.log("error while connecting to db: ", err))

// Routes
app.use("/url",urlRouter);


const port=5000;

app.listen(port, ()=>{
    console.log(`server running on port: ${port}`);
})