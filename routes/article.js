var express = require("express");
var router = express.Router();

//get all articles
router.get("/:searchQuery?", function (req, res, next) {
	res.json("get" + req.params.searchQuery);
});

//get article by id
router.get("/getById/:id", function (req, res, next) {
	res.json("get" + req.params.id);
});

//save article
router.post("/", function (req, res, next) {
	res.json("post");
});

//remove article
router.delete("/", function (req, res, next) {
	res.json("delete");
});

//edi article
router.put("/", function (req, res, next) {
	res.json("put");
});

module.exports = router;