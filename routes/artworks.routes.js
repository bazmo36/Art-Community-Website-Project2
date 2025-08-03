const Artwork = require("../models/Artwork");
const User = require("../models/User");
const router = require("express").Router()
const isSignedIn = require("../middleware/isSignedIn")
const multer = require("multer");
const upload = multer({ dest: "uploads/" });



// Show upload form
router.get("/new", isSignedIn, async (req, res)=>{
  try {
    const allUsers = await User.find()
    res.render("artworks/new", { allUsers })
  } 
  catch (error) {
    console.log("Error showing upload form:", error);
  }
})


// Upload artwork (Create)
router.post("/", isSignedIn, upload.single("image"), async (req, res) => {
  try {
    const newArtwork = await 
    Artwork.create({
      title: req.body.title,
      description: req.body.description,
      image: `/uploads/${req.file.filename}`, 
      artist: req.session.user._id
    });

    res.redirect("/users/profile");
  } catch (error) {
    console.log("Error uploading artwork:", error);
    res.redirect("/artworks/new");
  }
})


// Show all artworks
router.get("/", isSignedIn, async (req, res)=>{
  try {
    const allArtworks = await Artwork.find().populate("artist","username");
    res.render("artworks/all-artworks.ejs", {allArtworks,user: req.session.user})
  } 
   catch (error) {
    console.log("Error loading artworks:", error);
  }
})



// Show artwork details
router.get("/:artworkId",isSignedIn, async (req, res)=>{
  try {
    const foundArtwork = await Artwork.findById(req.params.artworkId)
      .populate("artist")
      .populate("comments.user");

    res.render("artworks/artwork-details.ejs", {foundArtwork})
  } 
   catch (error) {
    console.log("Error showing artwork details:", error);
  }
})


//Show edit form
router.get("/:artworkId/edit",isSignedIn, async(req,res)=>{
  try{
      const artwork = await Artwork.findById(req.params.artworkId)

      //only the owner can edit 
       if (!artwork.artist.equals(req.session.user._id)){
        return res.send("You are not authorized to edit this artwork.")
       }

       res.render("artworks/edit",{artwork})
  }
   catch(error){
      console.log("Error showing edit form:",error)
   }
})


//Update artwork
router.put("/:artworkId", isSignedIn, upload.single("image"), async(req,res)=>{
  try{
    const artwork = await Artwork.findById(req.params.artworkId)
    
    if(!artwork.artist.equals(req.session.user._id)){
      
      return res.send("Unauthorized action.")
    }
    
    artwork.title = req.body.title
    artwork.description = req.body.description

    if(req.file){
      artwork.image =`/uploads/${req.file.filename}`
    }

    await artwork.save()
    res.redirect(`/artworks/${artwork._id}`)


  }

  catch(error){
    console.log("Error updating artwork:",error)

  }

})


  //Delete arwork
  router.delete("/:artworkId",isSignedIn, async(req,res)=>{
    try{
      const artwork = await Artwork.findById(req.params.artworkId)

      if(!artwork.artist.equals(req.session.user._id)){
        return res.send("Unauthorized action")
      }

      await Artwork.findByIdAndDelete(req.params.artworkId)
      res.redirect("/artworks/users/profile");

    }

     catch(error){
      console.log("Error deleted artwork:",error)
     }
  })



//add comment to an artwork
router.post("/:artworkId/comment", isSignedIn, async (req, res) => {
    try{
          const foundArtwork = await Artwork.findById(req.params.artworkId)

           foundArtwork.comments.push({
            user:req.session.user._id,
            content: req.body.content
           })
             await foundArtwork.save();
        res.redirect(`/artworks/${foundArtwork._id}`);
    }
    catch (error) {
    console.log("Error adding comment:", error);
  }
})


//add like and unlike
router.post("/:artworkId/like", isSignedIn, async(req,res)=>{
    try{
    const artwork = await Artwork.findById(req.params.artworkId)

    const index = artwork.likes.indexOf(req.session.user._id)
    if (index === -1){
        artwork.likes.push(req.session.user._id)
    }else{
        artwork.likes.splice(index,1)
    }

     await artwork.save()
        res.redirect(`/artworks/${artwork._id}`)
    }
    catch (error) {
    console.log("Error liking artwork:", error)
  }
})



module.exports= router