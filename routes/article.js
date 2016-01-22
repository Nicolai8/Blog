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

//get all articles
router.get("/getByUserId/:id", function (req, res, next) {
	UnitOfWork.Article.getPageByUserId(req.params.id, 1, 10, function (err, articles) {
		if (err) return next(err);

		res.json(articles);
	});
});

//save article
router.post("/", checkAuth, function (req, res, next) {
	if (!req.body.content || !req.body.title) return next(new HttpError(400));

	var article = new UnitOfWork.Article({
		title: req.body.title,
		subtitle: req.body.subtitle || "",
		content: req.body.content,
		_owner: req.user.get("_id")
	});
	article.save(function (err, article) {
		if (err) return next(err);

		article = article.toObject();
		article._owner = {
			_id: req.user.get("_id"),
			username: req.user.get("username")
		};
		res.json(article);
	});
});

//remove article
router.delete("/:id", checkAuth, function (req, res, next) {
	async.waterfall([
		function (cb) {
			UnitOfWork.Article.findById(req.params.id, cb);
		},
		function (article, cb) {
			if (article == null) return cb(new HttpError(404));
			if (article.get("_owner").toString() != req.user.get("_id").toString()) return cb(new HttpError(401));

			async.parallel([
				function (callback) {
					UnitOfWork.Article.findByIdAndRemove(req.params.id, callback);
				},
				function (callback) {
					UnitOfWork.Comment.remove({"_article": req.params.id}, callback);
				}
			], cb);
		}
	], function (err) {
		if (err) return next(err);

		res.json({});
	});
});

//edi article
router.put("/:id", checkAuth, function (req, res, next) {
	async.waterfall([
		function (cb) {
			UnitOfWork.Article.findById(req.params.id, cb);
		},
		function (article, cb) {
			if (article == null) return cb(new HttpError(404));
			if (article.get("_owner").toString() != req.user.get("_id").toString()) return cb(new HttpError(401));

			UnitOfWork.Article.findByIdAndUpdate(
				req.params.id, {
					title: req.body.title,
					subtitle: req.body.subtitle,
					content: req.body.content
				}, cb);
		}
	], function (err, article) {
		if (err) return next(err);

		res.json(article);
	});
});

module.exports = router;