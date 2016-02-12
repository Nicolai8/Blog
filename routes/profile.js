"use strict";
var express = require("express");
var router = express.Router();
var async = require("async");
var UnitOfWork = require("models/UnitOfWork");
var HttpError = require("errors").HttpError;
var checkAuth = require("middleware/checkAuth");

//get profile by id
router.get("/:id", function (req, res, next) {
	UnitOfWork.User.getProfile(req.params.id, function (err, profile) {
		if (err)return next(err);
		if (!profile) return new HttpError(404);

		res.json(profile);
	});

});

//get my profile
router.get("/", checkAuth, function (req, res, next) {
	UnitOfWork.User.getProfile(req.user.get("_id"), function (err, profile) {
		if (err)return next(err);
		if (!profile) return new HttpError(404);

		res.json(profile);
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
	UnitOfWork.User.findByIdAndUpdate(req.user.get("_id"), propertiesToUpdate, function (err, profile) {
		if (err)return next(err);
		if (!profile) return next(new HttpError(404));

		res.json({});
	});
});

//remove profile
router.delete("/", checkAuth, function (req, res, next) {
	var userId = req.user.get("_id");

	async.parallel([
		function (cb) {
			UnitOfWork.Article.remove({
				"_owner": userId
			}, cb);
		},
		function (cb) {
			UnitOfWork.Comment.remove({
				"_owner": userId
			}, cb);
		},
		function (cb) {
			UnitOfWork.Rating.remove({
				"_owner": userId
			}, cb);
		},
		function (cb) {
			UnitOfWork.User.findByIdAndRemove(userId, cb);
		}
	], function (err) {
		if (err) return next(err);

		req.logout();
		res.json({});
	});
});

module.exports = router;