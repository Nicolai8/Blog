var express = require("express");
var router = express.Router();

//save comment
router.post("/", function (req, res, next) {
	res.json("post");
});

//remove comment
router.delete("/", function (req, res, next) {
	res.json("delete");
});

//edit comment
router.put("/", function (req, res, next) {
	res.json("put");
});

module.exports = router;