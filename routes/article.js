var express = require("express");
var router = express.Router();
var UnitOfWork = require("../models/UnitOfWork");

//get all articles
router.get("/:searchQuery?", function (req, res, next) {
	UnitOfWork.Article.getPage(req.params.searchQuery || "", 1, 10, function (err, articles) {
		if (err) return next(err);

		res.json(articles);
	});
});

//get article by id
router.get("/getById/:id", function (req, res, next) {
	UnitOfWork.Article.findById(req.params.id)
		.populate({
			path: "_owner",
			select: "username"
		}).exec(function (err, article) {
		if (err) return next(err);

		res.json(article);
	});
});

//save article
router.post("/", function (req, res, next) {
	res.json("post");
});

//remove article
router.delete("/:id", function (req, res, next) {
	res.json("delete");
});

//edi article
router.put("/:id", function (req, res, next) {
	res.json("put");
});

module.exports = router;