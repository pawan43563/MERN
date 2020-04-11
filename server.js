const express=require("express")
const app=express()
const connectDB=require('./config/db')
const path=require("path")

//connect db
connectDB()


//Middleware
app.use(express.json({extended:false}));

//Define Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));

//Serve Static assests
if(process.env.NODE_ENV==='production'){
    //set Static folder
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT=process.env.PORT || 5000

app.listen(PORT,(req,res)=>{
    console.log(`Server Started at port ${PORT}` )
});