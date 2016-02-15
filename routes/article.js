"use strict";
var express = require("express");
var router = express.Router();
var config = require("config");
var HttpError = require("errors").HttpError;
var articleService = require("services/articleService");
var ratingService = require("services/ratingService");
var checkAuth = require("middleware/checkAuth");
var isArticleOwner = require("middleware/isOwner")("article");

//get all articles
router.get("/:searchQuery?", function (req, res, next) {
	articleService.get(
			req.params.searchQuery || "",
			req.params.page || 1,
			req.params.pageSize || config.get("pageSize"))
		.then((articles)=> {
			res.json(articles);
		})
		.catch(next);
});

//get article by id
router.get("/getById/:id", function (req, res, next) {
	articleService.getById(req.params.id)
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
		.catch(next);
});

router.get("/getRatingForUser/:id", checkAuth, function (req, res, next) {
	ratingService.getRatingForUser(req.params.id, req.user.get("_id"))
		.then((rating) => {
			res.json(rating ? rating.get("rating") : 0);
		})
		.catch(next);
});

//get all articles
router.get("/getByUserId/:id", function (req, res, next) {
	articleService.getPageByUserId(
		req.params.id,
			req.params.page || 1,
			req.params.pageSize || config.get("pageSize")
		)
		.then((articles)=> {
			res.json(articles);
		})
		.catch(next);
});

//save article
router.post("/", checkAuth, function (req, res, next) {
	if (!req.body.content || !req.body.title) return next(new HttpError(400));

	articleService.create(req.user.get("_id"), req.body)
		.then((article)=> {
			article = article.toObject();
			article._owner = {
				_id: req.user.get("_id"),
				username: req.user.get("username")
			};
			res.json(article);
		})
		.catch(next);
});

//remove article
router.delete("/:id", checkAuth, isArticleOwner, function (req, res, next) {
	articleService.delete(req.params.id)
		.then(()=> {
			res.json({});
		})
		.catch(next);
});

//edit article
router.put("/:id", checkAuth, isArticleOwner, function (req, res, next) {
	articleService.update(req.params.id, {
			title: req.body.title,
			subtitle: req.body.subtitle,
			content: req.body.content
		})
		.then((article)=> {
			res.json(article);
		})
		.catch(next);
});

//update rating
router.put("/:id/rating", checkAuth, function (req, res, next) {
	ratingService.update(req.body.rating, req.user.get("_id"), req.params.id)
		.then(newRating=> {
			res.json({
				value: newRating[0].ratingValue,
				count: newRating[0].ratingCount
			});
		}).catch(next);
});

module.exports = router;