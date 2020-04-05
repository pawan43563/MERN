const express=require('express');
const router=express.Router();

//@route GET api/posts
//@desc TEST Route
//@access public
router.get('/',(req,res)=> res.send('Posts Route'));

module.exports=router;