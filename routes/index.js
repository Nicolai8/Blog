var express = require("express");
var router = express.Router();

module.exports = function (app) {
	router.get("/", function (req, res, next) {
		res.render("index", {user: req.session.user});
	});

	router.post("/login", require("./auth"));
	router.post("/logout", require("./logout"));
	app.use(router);
	app.use("/article", require("./article"));
	app.use("/comment", require("./comment"));
	app.use("/profile", require("./profile"));
};