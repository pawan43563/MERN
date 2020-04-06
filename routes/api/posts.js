const express=require('express');
const router=express.Router();
const {check,validationResult}=require("express-validator")
const Profile=require("../../models/Profile")
const Post=require("../../models/Post")
const User=require("../../models/User")
const auth=require("../../middleware/auth")
//@route GET api/posts
//@desc TEST Route
//@access private
router.post('/',[auth,[
    check("text","Text required").not().isEmpty()
]],async (req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json("Invalid ")
    }
    try{

        const user=await User.findById(req.user.id).select('-password')
        const newPost=new Post({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        })

        const post=await newPost.save()
        res.json(post);
    }catch(err){
        console.log(err.message)
        res.status(400).json({msg:"Server Error"})
    }


} );


//@route get all posts
router.get('/',auth,async (req,res)=>{
    try{
        const post=await Post.find().sort({date:-1})
        res.json(post)
    }catch(err){
        console.log(err.message)
        res.status(400).json({msg:"Server Error"})
    }
})

//@route get post by post id /posts/:id
router.get('/:id',auth,async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({msg:"Post Not Found"})
        }
        res.json(post)
    }catch(err){
        console.log(err.message)
        if(err.kind==='ObjectId'){
            res.status(400).json({msg:"Post Not Found"})
        }
        res.status(400).json({msg:"Server Error"})
    }
})

//@route delete posts by postid /:id
router.delete('/:id',auth,async (req,res)=>{
    try{

        const post =await Post.findById(req.params.id);
        //cehck user
        if(!post){
            return res.status(400).json({msg:"Post Not Found"})
        }
        if(post.user.toString()!==req.user.id){
            return res.status(404).json({msg:"Unauthorized"})
        }
        await post.remove()
        res.json("Remove")
    }catch(err){
        console.log(err.message)
        res.status(400).json({msg:"Server Error"}) 
    }
})

//@route add likes /like/:id
router.put('/like/:id',auth,async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        //check if already being liked
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res.status(400).json({msg:"Post Already Liked"})
        }
        post.likes.unshift({user:req.user.id})
        await post.save()
        res.json(post.likes)
    }catch(err){
        console.log(err.message)
        res.status(400).json({msg:"Server Error"}) 
    }
})

//@route add likes /unlike/:id
router.put('/unlike/:id',auth,async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        //check if post is liked 
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res.status(400).json({msg:"Post Not Liked"})
        }
        
        //get removeIndex
        const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1)
        await post.save()
        res.json(post.likes)
    }catch(err){
        console.log(err.message)
        res.status(400).json({msg:"Server Error"}) 
    }
})

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
    '/comment/:id',
    [auth,[
        check('text',"Text required").not().isEmpty()
    ]],
    async  (req, res) => {
      const errors = validationResult(req);
  
      // Check Validation
      if (!errors.isEmpty()) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }
  
      Post.findById(req.params.id)
        .then(post => {
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
          };
  
          // Add to comments array
          post.comments.unshift(newComment);
  
          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
  );
  
  // @route   DELETE api/posts/comment/:id/:comment_id
  // @desc    Remove comment from post
  // @access  Private
  router.delete(
    '/comment/:id/:comment_id',
    auth,
    async (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          // Check to see if comment exists
          if (
            post.comments.filter(
              comment => comment._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentnotexists: 'Comment does not exist' });
          }
  
          // Get remove index
          const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);
  
          // Splice comment out of array
          post.comments.splice(removeIndex, 1);
  
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
  );
module.exports=router;