const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require("../middlewares/upload")


router.get("/profile")