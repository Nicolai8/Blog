var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
	res.json("post");
});

router.delete("/", function (req, res, next) {
	res.json("delete");
});

module.exports = router;