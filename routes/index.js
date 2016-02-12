"use strict";
var express = require("express");
var router = express.Router();
var checkAuth = require("middleware/checkAuth");
var authRoute = require("./auth");
var logoutRoute = require("./logout");
var articleRoute = require("./article");
var commentRoute = require("./comment");
var profileRoute = require("./profile");

module.exports = function (app) {
	router.get("/", function (req, res, next) {
		res.render("index", {
			user: !req.user || {
				_id: req.user.get("_id"),
				username: req.user.get("username")
			}
		});
	});

	app.use("/login", authRoute);
	router.post("/logout", checkAuth, logoutRoute);
	app.use(router);
	app.use("/article", articleRoute);
	app.use("/comment", commentRoute);
	app.use("/profile", profileRoute);
};