const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const upload = require("../middlewares/upload");
const isSignedIn = require("../middleware/isSignedIn");
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })


// Profile Page
router.get("/profile",isSignedIn,async(req,res)=>{
    try{
       const user = await User.findById(req.session.user._id)
       res.render("users/profile",{user})
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


router.post("/edit-profile", isSignedIn, upload.single("profilePic"), async (req, res) => {
    try {
        const updateData = { bio: req.body.bio || "" };

        if (req.file) {
            updateData.profilePic = "/uploads/" + req.file.filename; // Save path in DB
        }

        const updatedUser = await User.findByIdAndUpdate(req.session.user._id, updateData, { new: true });
        req.session.user = updatedUser;

        res.redirect("/users/profile");
    } catch (error) {
        console.log("Error updating profile:", error);
        res.render("users/edit-profile.ejs", { user: req.session.user, error: "Update failed" });
    }
});


module.exports = router