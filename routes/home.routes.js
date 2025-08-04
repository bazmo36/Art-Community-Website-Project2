const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("home", { currentUser: req.session.user });

})


module.exports = router