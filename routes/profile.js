var express = require("express");
var router = express.Router();
var checkAuth = require("../middleware/checkAuth");

//get profile by id
router.get("/:id", function (req, res, next) {
	res.json("profile " + req.params.id);
});

//get my profile
router.get("/", checkAuth, function (req, res, next) {
	res.json(req.user);
});

//save profile
router.put("/", checkAuth, function (req, res, next) {
	res.json("put");
});

//remove profile
router.delete("/", checkAuth, function (req, res, next) {
	res.json("delete");
});

module.exports = router;