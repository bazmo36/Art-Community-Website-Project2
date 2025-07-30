const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "username is required" ],
        unique: [true, "username already taken please pick another username"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
        bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg" 
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    notifications: [notificationSchema]
}, { timestamps: true });



const User = mongoose.model("User",userSchema)

module.exports = User