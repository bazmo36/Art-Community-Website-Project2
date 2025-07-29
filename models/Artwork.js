const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: String,
        createdAt: { type: Date, default: Date.now }
}, {timestamps:true})


const artworkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: String,

    imageUrl: {
        type: String,
        required: true
    },

    collections: [String],
    
    artist: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
  
 
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],


    comments:[commentSchema], 

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Artwork", artworkSchema);

