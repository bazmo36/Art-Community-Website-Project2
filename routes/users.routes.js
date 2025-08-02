const express = require("express");
const router = express.Router();
const User = require("../models/User")
const Artwork = require("../models/Artwork")
const isSignedIn = require("../middleware/isSignedIn")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })



//View Current User Profile  
router.get("/profile", isSignedIn, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    .populate("following")
    .populate("followers")

    const myArtworks = await Artwork.find({ artist: currentUser._id })


    res.render("users/profile", { user: currentUser,currentUser, myArtworks })
  }
  catch (error) {
    console.log("Error loading profil:",error)
     res.redirect("/")
  }
})



//Show Edit Profile Page
router.get("/edit-profile", isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render("users/edit-profile.ejs", { user, error: null });
  }
  catch (error) {
    console.log(error, "Error loading edit profile page")
  }
})


router.put("/edit-profile",
  isSignedIn, upload.single("profilePic"), async (req, res) => {
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




// Follow a user
router.post("/follow/:id", isSignedIn, async (req, res) => {
  const currentUser = await User.findById(req.session.user._id)

  const targetUser = await User.findById(req.params.id)

  if (!targetUser.followers.includes(currentUser._id)) {

    targetUser.followers.push(currentUser._id)

    currentUser.following.push(targetUser._id)

    await targetUser.save()
    await currentUser.save()

  }

  res.redirect(`/users/${targetUser._id}`)

})



//Unfollow a user
router.post("/unfollow/:id", isSignedIn, async (req, res) => {

  const currentUser = await User.findById(req.session.user._id)

  const targetUser = await User.findById(req.params.id)

  targetUser.followers = targetUser.followers.filter((followerId) => !followerId.equals(currentUser._id)
  )

  currentUser.following = currentUser.following.filter((followerId) => !followerId.equals(targetUser._id))

  await targetUser.save()
  await currentUser.save()

  res.redirect(`/users/${targetUser._id}`)

})


//View another user's profile
router.get("/:id",isSignedIn,async(req,res)=>{
  try{
    const currentUser = await User.findById(req.session.user._id)
    .populate("following")
    .populate("followers")

     const targetUser = await User.findById(req.params.id)
    .populate("following")
    .populate("followers")

    const myArtworks = await Artwork.find({artist: targetUser._id})

    res.render("users/profile", {user:targetUser,currentUser, myArtworks})

  }
   catch(error){
    console.log("Error loading user profile",error)
    res.redirect("/home")
   }
})



module.exports = router