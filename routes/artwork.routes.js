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


// Show all artworks
router.get("/", async (req, res)=> {
    try {
        const allArtworks = await Artwork.find().populate("artist");
        res.render("artworks/all-artworks.ejs", { allArtworks, user: req.session.user
        });
    } catch (error) {
        console.log(error);
    
    }
});

// show details of a single artwork
router.get("/:artworkId",async(req,res)=>{
     try{
        const foundArtwork = await Artwork.findById(req.params.artworkId)
        console.log(foundArtwork)
        res.render("artworks/artwork-details.ejs",{foundArtwork})
    }
    catch(error){
        console.log(error)
    }
})