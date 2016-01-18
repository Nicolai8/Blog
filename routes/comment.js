var express = require("express");
var router = express.Router();

//save comment
router.post("/", function (req, res, next) {
	res.json("post");
});

//remove comment
router.delete("/:id", function (req, res, next) {
	res.json("delete");
});

//edit comment
router.put("/:id", function (req, res, next) {
	res.json("put");
});

module.exports = router;