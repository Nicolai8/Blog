var express = require("express");
var router = express.Router();
var async = require("async");
var HttpError = require("../errors").HttpError;
var UnitOfWork = require("../models/UnitOfWork");
var checkAuth = require("../middleware/checkAuth");

//get all articles
router.get("/:searchQuery?", function (req, res, next) {
	UnitOfWork.Article.getPage(req.params.searchQuery || "", 1, 10, function (err, articles) {
		if (err) return next(err);

		res.json(articles);
	});
});

//get article by id
router.get("/getById/:id", function (req, res, next) {
	async.parallel({
		article: function (cb) {
			UnitOfWork.Article.findById(req.params.id)
				.populate([{
					path: "_owner",
					select: "username"
				}]).exec(cb);
		},
		comments: function (cb) {
			UnitOfWork.Comment.find({"_article": req.params.id}).populate("_owner", "username").exec(cb);
		}
	}, function (err, results) {
		if (err) return next(err);
		if (!results.article) return next(new HttpError(404));

		var article = results.article.toObject();
		article.comments = results.comments;

		res.json(article);
	});

});

//save article
router.post("/", checkAuth, function (req, res, next) {
	res.json("post");
});

//remove article
router.delete("/:id", checkAuth, function (req, res, next) {
	res.json("delete");
});

//edi article
router.put("/:id", checkAuth, function (req, res, next) {
	res.json("put");
});

module.exports = router;