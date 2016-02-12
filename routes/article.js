"use strict";
var express = require("express");
var router = express.Router();
var config = require("config");
var mongoose = require("lib/mongoose");
var HttpError = require("errors").HttpError;
var UnitOfWork = require("models/UnitOfWork");
var checkAuth = require("middleware/checkAuth");
var isArticleOwner = require("middleware/isOwner")("article");

//get all articles
router.get("/:searchQuery?", function (req, res, next) {
	UnitOfWork.Article.getPage(
			req.params.searchQuery || "",
			req.params.page || 1,
			req.params.pageSize || config.get("pageSize"))
		.then((articles)=> {
			res.json(articles);
		})
		.catch((err)=> {
			next(err);
		});
});

//get article by id
router.get("/getById/:id", function (req, res, next) {
	UnitOfWork.Article.getArticleById(req.params.id)
		.then((results)=> {
			if (!results[0]) return next(new HttpError(404));

			var article = results[0].toObject();
			article.comments = results[1];
			if (results[2] && results[2].length > 0) {
				article.rating = {
					value: results[2][0].ratingValue,
					count: results[2][0].ratingCount
				};
			}

			res.json(article);
		})
		.catch((err)=> {
			next(err)
		});
});

router.get("/getRatingForUser/:id", checkAuth, function (req, res, next) {
	UnitOfWork.Rating.findOne({
		_article: req.params.id,
		_owner: req.user.get("_id")
	}).then((rating) => {
			res.json(rating ? rating.get("rating") : 0);
		})
		.catch((err)=> {
			next(err)
		});
});

//get all articles
router.get("/getByUserId/:id", function (req, res, next) {
	UnitOfWork.Article.getPageByUserId(req.params.id, 1, 10)
		.then((articles)=> {
			res.json(articles);
		})
		.catch((err)=> {
			next(err)
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
	article.save().then((article)=> {
			article = article.toObject();
			article._owner = {
				_id: req.user.get("_id"),
				username: req.user.get("username")
			};
			res.json(article);
		})
		.catch((err)=> {
			next(err);
		});
});

//remove article
router.delete("/:id", checkAuth, isArticleOwner, function (req, res, next) {
	Promise.all([
			UnitOfWork.Article.findByIdAndRemove(req.params.id),
			UnitOfWork.Comment.remove({"_article": req.params.id}),
			UnitOfWork.Rating.remove({"_article": req.params.id})
		])
		.then(()=> {
			res.json({});
		})
		.catch((err)=> {
			next(err);
		});
});

//edit article
router.put("/:id", checkAuth, isArticleOwner, function (req, res, next) {
	UnitOfWork.Article.findByIdAndUpdate(
		req.params.id, {
			title: req.body.title,
			subtitle: req.body.subtitle,
			content: req.body.content
		})
		.then((article)=> {
			res.json(article);
		})
		.catch((err)=> {
			next(err);
		});
});

router.put("/:id/rating", checkAuth, function (req, res, next) {
	UnitOfWork.Rating.findOne({
		$and: [
			{"_owner": req.user.get("_id")},
			{"_article": req.params.id}
		]
	}).then((rating)=> {
		if (rating !== null) {
			return UnitOfWork.Rating.findByIdAndUpdate(rating.get("_id"), {rating: req.body.rating});
		}
		var newRating = new UnitOfWork.Rating({
			"_owner": req.user.get("_id"),
			"_article": req.params.id,
			"rating": req.body.rating
		});
		return newRating.save();
	}).then(()=> {
		return UnitOfWork.Rating.aggregate({
				$match: {"_article": mongoose.Types.ObjectId(req.params.id)}
			}, {
				$group: {
					_id: null,
					"ratingValue": {$avg: "$rating"},
					"ratingCount": {$sum: 1}
				}
			}
		).exec();
	}).then(newRating=> {
		res.json({
			value: newRating[0].ratingValue,
			count: newRating[0].ratingCount
		});
	}).catch(err=> {
		return next(err);
	});
});

module.exports = router;