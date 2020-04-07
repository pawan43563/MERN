const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator')
const bcrypt=require("bcryptjs")
const gravator=require("gravatar")
const config=require("config")
const jwt=require("jsonwebtoken")
//model
const User=require("../../models/User");
//@route POST api/users
//@desc TEST Route
//@access public
router.post('/',[
    check('name','Enter Name').not().isEmpty(),
    check('email','Enter Valid Email').isEmail(),
    check('password','Enter Password').isLength({min:6})

],async (req,res)=> {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name,email,password}=req.body;
    try{
        
        //see if user exists
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({errors:[{msg:"User Already registered"}]})
        }
        else{
        //get gravator
        const avator=gravator.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        })

        user=new User({name,email,avator,password});
        //Encrypt password
        const salt=await bcrypt.genSalt(10)
        user.password=await bcrypt.hash(password,salt);
        await user.save()

        //return jsonwebtoken
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err,token)=>{
            if(err) throw err;
            res.json({token});
        })
    }
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }

});

module.exports=router;