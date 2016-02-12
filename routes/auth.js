"use strict";
var express = require("express");
var router = express.Router();
var passport = require("lib/passport");

router.post("/", passport.authenticate);

router.get("/facebook", passport.authenticateFacebook);

router.get("/facebook/callback", passport.authenticateFacebookCallback, function (req, res) {
	res.redirect("/");
});

module.exports = router;