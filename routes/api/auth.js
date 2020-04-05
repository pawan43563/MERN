const express=require('express');
const router=express.Router();
const auth=require("../../middleware/auth")
const User=require("../../models/User")
const {check,validationResult}=require('express-validator')
const bcrypt=require("bcryptjs")
const config=require("config")
const jwt=require("jsonwebtoken")
//@route GET api/auth
//@desc TEST Route
//@access public
router.get('/',auth,async (req,res)=> {
    
    try{
    const user=await User.findById(req.user.id).select("-password")    
    
    res.json(user);
    }catch(err){
        console.error(err.message)
        res.status(500).json({msg:"Server Error"})
    }

});


//@route POST api/auth
//@desc TEST Route
//@access public
router.post('/',[
    
    check('email','Enter Valid Email').isEmail(),
    check('password','Enter Password').exists()

],async (req,res)=> {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body;
    try{
        
        //see if user exists
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:[{msg:"Invalid Credentials"}]})
        }
        
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:"Invalid Credentials"}]})
        }
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

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }

});

module.exports=router;