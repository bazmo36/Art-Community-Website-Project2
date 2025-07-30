const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require("../middlewares/upload");
const isSignedIn = require("../middleware/isSignedIn");


router.get("/profile",isSignedIn,async(req,res)=>{
    try{

    }
     catch{
        
     }
})