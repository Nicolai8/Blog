var express = require("express");
var router = express.Router();

//get my profile
router.get("/", function (req, res, next) {
	res.json("my profile");
});

//get profile by id
router.get("/:id", function (req, res, next) {
	res.json("profile " + req.params.id);
});

//save profile
router.put("/", function (req, res, next) {
	res.json("put");
});

//remove profile
router.delete("/", function (req, res, next) {
	res.json("delete");
});

module.exports = router;