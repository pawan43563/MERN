const express=require('express');
const router=express.Router();
const auth=require("../../middleware/auth")
const User=require("../../models/User")
const Profile=require("../../models/Profile")
const config=require('config')
const request=require("request")
const {check,validationResult}=require("express-validator")
const Post=require("../../models/Post")
//@route GET api/profile/me
//@desc TEST Route
//@access private
router.get('/me',auth,async (req,res)=> {
    try{
        const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
        if(!profile){
            return res.status(400).json({msg:"Profile Not Found"})
        }
        res.json(profile)
    }catch(err){
        console.error(err.message)
        return  res.status(500).json({msg:"Server Error"})
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
            return res.json(profile)
        } 
        //create
        else {profile=new Profile(profileFields);
        await profile.save();
        res.json(profile)
        }
      }catch(err){
          console.error(err.message)
          return  res.status(400).json({msg:"Server Error"})
      }
    }
  );
  
//@route GET api/profile
//@access public
router.get('/',async (req,res)=>{
    try{
        const profiles=await Profile.find().populate('user',['name','avatar'])
        console.log("came")
        res.json(profiles)
    }catch(err){
        console.error(err.message)
        return  res.status(500).json({msg:"Server Error"})
    }
})

//@route GET api/profile/user/:userid
//get profile by user id
router.get('/user/:user_id',async (req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avator'])
        if(!profile) return res.status(400).json({msg:"Profile not found"})
        res.json(profile)
    }catch(err){
        console.error(err.message)
        if(err.kind=='ObjectId'){
            return res.status(400).json({msg:"Profile Not Found"})
        }
        return  res.status(500).json({msg:"Server Error"})
    }
})

//@route delete user and profile
router.delete('/',auth,async (req,res)=>{
    try{
        //remove posts
        await Post.deleteMany({user:req.user.id})
        //remove profile
        await Profile.findOneAndRemove({user:req.user.id})
        //remove user
        await User.findOneAndRemove({_id:req.user.id})

        res.status(200).json({msg:"User Removed"})
    }catch(err){
        console.error(err.message)
        return res.status(500).json({msg:"Server Error"})
    }
})

//@route PUT api/profile/experience
router.put('/experience',[auth,[
    check('title','Title required').not().isEmpty(),
    check('company','Company required').not().isEmpty(),
    check('from','from required').not().isEmpty()
]],async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    const {
        title,
        company,
        from,
        to,
        location,
        current,
        description
    }=req.body;

    const newExp= {
        title,
       company,
       from,
       to,
      location,
     current,
     description
    }
    try{

        const profile=await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save()
        res.json(profile)
    }catch(err){
        console.error(err.message)
        return  res.status(400).json({msg:"Server Error"})
    }
})

//@route DELETE experience/:exp_id
router.delete('/experience/:exp_id',auth,async (req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.user.id})
        //Get remove index

        const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex,1)
        await profile.save()
        res.json(profile)
    }catch(err){
        console.error(err.message)
        return res.status(400).json({msg:"Server Error"})
    }
})


//@route PUT api/profile/education
router.put('/education',[auth,[
    check('school','School required').not().isEmpty(),
    check('degree','Degree required').not().isEmpty(),
    check('from','from required').not().isEmpty(),
    check('fieldofstudy','fieldofstudy required').not().isEmpty()
]],async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    const {
        school,
        degree,
        from,
        to,
        current,
        description,
        fieldofstudy
    }=req.body;

    const newedu= {
        school,
        degree,
        from,
        to,
        current,
        description,
        fieldofstudy
    }
    try{
        const profile=await Profile.findOne({user:req.user.id});
        profile.education.unshift(newedu);
        await profile.save()
        res.json(profile)
    }catch(err){
        console.error(err.message)
        return res.status(400).json({msg:"Server Error"})
    }
})

//@route DELETE education/:edu_id
router.delete('/education/:edu_id',auth,async (req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.user.id})
        //Get remove index

        const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.edu_id)
        profile.education.splice(removeIndex,1)
        await profile.save()
        res.json(profile)
    }catch(err){
        console.error(err.message)
        return res.status(400).json({msg:"Server Error"})
    }
})

//@get api/profile/github/:username
//get github repos
router.get('/github/:username',(req,res)=>{
    try{
        const options={
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&
            client_id=${config.get("githubClientId")}&client_secret=${config.get('githubSecret')}`,
            method:'get',
            headers:{'user-agent':'node.js'}
        }
        request(options,(error,response,body)=>{
            if(Error) console.error(Error)
            if(response.statusCode!==200){
                return res.status(404).json({msg:"Profile Not Found"})
            }
            res.json(JSON.parse(body))
        })
    }catch(err){
        console.error(err.message)
        return res.status(400).json({msg:"Server Error"})
    }
})



module.exports=router;