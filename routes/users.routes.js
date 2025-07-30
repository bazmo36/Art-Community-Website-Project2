const express = require("express");
const router = express.Router();
const User = require("../models/User")
const Artwork = require("../models/Artwork")
const isSignedIn = require("../middleware/isSignedIn")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })



// Profile Page
router.get("/profile",isSignedIn,async(req,res)=>{
    try{
       const user = await User.findById(req.session.user._id)

       const myArtworks = await Artwork.find({ owner: req.session.user._id })

       res.render("users/profile",{user, myArtworks})
    }
     catch{
       console.log(error,"Error loading profil")
     }
})


//Show Edit Profile
router.get("/edit-profile",isSignedIn, async(req,res)=>{
    try {
        const user = await User.findById(req.session.user._id);
        res.render("users/edit-profile.ejs", { user, error: null });
    } 
     catch (error) {
        console.log(error,"Error loading edit profile page")
    }
})


router.put("/edit-profile",
isSignedIn, upload.single("profilePic"),async (req, res) => {
    try {
      const updateData = { bio: req.body.bio || "" };

      if (req.file) {
        updateData.profilePic = "/uploads/" + req.file.filename; // Save path in DB
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.session.user._id,
        updateData,
        { new: true }
      );
      req.session.user = updatedUser;

      res.redirect("/users/profile");
    } 
     catch (error) {
      console.log("Error updating profile:", error);
      res.render("users/edit-profile.ejs", {
        user: req.session.user,
        error: "Update failed",
      });
    }
  }
);


//Delete Profile
router.delete("/delete", isSignedIn, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.session.user._id);
    req.session.destroy(() => {
      res.redirect("/auth/sign-up");
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.redirect("/users/profile");
  }
});

//My aerwork section
router.get("/profile", isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const artworks = await Artwork.find({ userId: req.session.user._id });

    res.render("users/profile", { user, artworks });
  } 
  catch (error) {
    console.log("Error loading profile:", error)
    res.redirect("/")
  }
})





module.exports = router