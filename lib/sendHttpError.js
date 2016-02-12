"use strict";
var util = require("util");
module.exports = function (err, req, res, next) {
	res.status(err.status);
	if (res.req.headers["x-requested-with"] === "XMLHttpRequest") {
		err = {
			status: err.status,
			message: err.message,
			stack: err.stack || ""
		};
		res.json(err);
	} else {
		//res.redirect(util.format("/#/error/%s?message=%s&stack=%s", error.status, error.message, error.stack || ""));
		res.render("error", {error: err, message: err.message});
	}
};