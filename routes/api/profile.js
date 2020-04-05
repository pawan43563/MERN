const express=require('express');
const router=express.Router();
const auth=require("../../middleware/auth")
const Profile=require("../../models/Profile")
const User=require("../../models/User")
const {check,validationResult}=require("express-validator")
//@route GET api/profile/me
//@desc TEST Route
//@access private
router.get('/me',auth,async (req,res)=> {
    try{
        const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
        if(!profile){
            res.status(400).json({msg:"Profile Not Found"})
        }
    }catch(err){
        console.error(err.message)
        res.status(500).json({msg:"Server Error"})
    }
});


// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private
router.post(
    '/', 
    [auth,[
        check('status','Status required').not().isEmpty(),
        check('skills',"Skills required").not().isEmpty()

    ]],
    async (req, res) => {
      const errors=validationResult(req)
      // Check Validation
      if (!errors.isEmpty()) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
      const {company,website,location,bio,status,skills,githubusername,youtube,facebook,instagram,twitter,linkedin}=req.body
      // Get fields
      const profileFields = {};
      profileFields.user = req.user.id;
      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (status) profileFields.status = status;
      if (bio) profileFields.bio = bio;
      if (githubusername) profileFields.githubusername = githubusername;
      // Skills - Spilt into array
      if(skills) {
          profileFields.skills=skills.split(',').map(skill=>skill.trim())
      }
      // Social (optional fields)
      profileFields.social = {};
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
      if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  
      try{
        let profile=await Profile.findOne({user:req.user.id})
        if(profile){
            //update
            profile=await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
            res.send(profile)
        } 
        //create
        profile=new Profile(profileFields);
        await profile.save();
        res.json(profile)
      }catch(err){
          console.error(err.message)
          res.status(400).json({msg:"Server Error"})
      }
    }
  );
  

module.exports=router;