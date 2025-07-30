const Artwork = require("../models/Artwork");
const User = require("../models/User");
const router = require("express").Router()


//show upload form 
router.get("/new",async(req,res)=>{
try{
  const allUsers = await User.find()
  res.render("artworks/new",{allUsers})
}
 catch(error){
   console.log(error)
 }
})


//upload artwork (create)
router.post("/",async(req,res)=>{
    try{
       req.body.artist = req.session.user._id
       await Artwork.create(req.body)
    }
     catch(error){
        console.log(error)
     }
})


// Show all artworks (Read)
router.get("/", async (req, res)=> {
    try {
        const allArtworks = await Artwork.find().populate("artist");
        res.render("artworks/all-artworks.ejs", { allArtworks, user: req.session.user
        });
    } 
    catch (error) {
        console.log(error);
    
    }
});

// show details of a single artwork (Read)
router.get("/:artworkId",async(req,res)=>{
     try{
        const foundArtwork = await Artwork.findById(req.params.artworkId).populate("artist").populate("comments.user")
        console.log(foundArtwork)
        res.render("artworks/artwork-details.ejs",{foundArtwork})
    }
    catch(error){
        console.log(error)
    }
})

//add comment to an artwork
router.post("/:artworkId/comment",async(req,res)=>{
    try{
          const foundArtwork = await Artwork.findById(req.params.artworkId)

           foundArtwork.comments.push({
            user:req.session.user._id,
            content: req.body.content
           })
             await foundArtwork.save();
        res.redirect(`/artworks/${foundArtwork._id}`);
    }
    catch(error){
       console.log(error)
    }
})


router.post("/:artworkId/like",async(req,res)=>{
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
    catch(error){
        console.log(error)
    }
})

module.exports= router