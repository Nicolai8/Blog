var express = require('express');
var router = express.Router();
var auth = require("./auth");

router.get("/", function (req, res, next) {
	res.render("index", {title: "Express"});
});

router.post("/login", auth);
router.post("/logout", function (req, res, next) {

});

module.exports = router;