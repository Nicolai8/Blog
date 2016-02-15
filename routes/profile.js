"use strict";
var express = require("express");
var router = express.Router();
var userService = require("services/userService");
var HttpError = require("errors").HttpError;
var checkAuth = require("middleware/checkAuth");

//get profile by id
router.get("/:id", function (req, res, next) {
	userService.getById(req.params.id)
		.then((profile) => {
			if (!profile) return new HttpError(404);

			res.json(profile);
		})
		.catch(next);
});

//get my profile
router.get("/", checkAuth, function (req, res, next) {
	userService.getById(req.user.get("_id"))
		.then(res.json)
		.catch(next);
});

//save profile
router.put("/", checkAuth, function (req, res, next) {
	return userService.update(req.user.get("_id"), req.body)
		.then(()=> {
			res.json({});
		})
		.catch(next);
});

//remove profile
router.delete("/", checkAuth, function (req, res, next) {
	userService.delete(req.user.get("_id"))
		.then(()=> {
			req.logout();
			res.json({});
		})
		.catch(next);
});

module.exports = router;