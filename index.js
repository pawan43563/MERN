const express=require("express");
const app=express()
const connectDB=require('./config/db')


//connect db
connectDB()

app.get("/",function(req,res){
    res.send("Hello World!")
})

//Middleware
app.use(express.json({extended:false}));

//Define Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));


const PORT=process.env.PORT || 5000

app.listen(PORT,(req,res)=>{
    console.log("Server Started at ",PORT)
});