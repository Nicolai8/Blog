var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
	res.send("post");
});

router.put("/", function (req, res, next) {
	res.send("put");
});

router.delete("/", function (req, res, next) {
	res.send("delete");
});

module.exports = router;