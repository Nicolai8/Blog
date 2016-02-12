"use strict";
var express = require("express");
var router = express.Router();
var UnitOfWork = require("models/UnitOfWork");
var HttpError = require("errors").HttpError;
var checkAuth = require("middleware/checkAuth");

//get profile by id
router.get("/:id", function (req, res, next) {
	UnitOfWork.User.getProfile(req.params.id)
		.then((profile) => {
			if (!profile) return new HttpError(404);

			res.json(profile);
		})
		.catch((err)=> {
			next(err);
		});
});

//get my profile
router.get("/", checkAuth, function (req, res, next) {
	UnitOfWork.User.getProfile(req.user.get("_id"))
		.then((profile) => {
			res.json(profile);
		})
		.catch((err)=> {
			next(err);
		});
});

//save profile
router.put("/", checkAuth, function (req, res, next) {
	var propertiesToUpdate = {
		email: req.body.email,
		birthday: req.body.birthday,
		gender: req.body.gender,
		about: req.body.about
	};
	UnitOfWork.User.findByIdAndUpdate(req.user.get("_id"), propertiesToUpdate)
		.then(()=> {
			res.json({});
		})
		.catch((err)=> {
			next(err);
		});
});

//remove profile
router.delete("/", checkAuth, function (req, res, next) {
	var userId = req.user.get("_id");

	Promise.all([
		UnitOfWork.Article.remove({
			"_owner": userId
		}),
		UnitOfWork.Comment.remove({
			"_owner": userId
		}),
		UnitOfWork.Rating.remove({
			"_owner": userId
		}),
		UnitOfWork.User.findByIdAndRemove(userId)
	]).then(()=> {
		req.logout();
		res.json({});
	}).catch((err)=> {
		next(err);
	});
});

module.exports = router;