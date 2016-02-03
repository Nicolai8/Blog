var express = require("express");
var router = express.Router();
var checkAuth = require("middleware/checkAuth");

module.exports = function (app) {
	router.get("/", function (req, res, next) {
		res.render("index", {
			user: !req.user || {
				_id: req.user.get("_id"),
				username: req.user.get("username")
			}
		});
	});

	app.use("/login", require("./auth"));
	router.post("/logout", checkAuth, require("./logout"));
	app.use(router);
	app.use("/article", require("./article"));
	app.use("/comment", require("./comment"));
	app.use("/profile", require("./profile"));
};