"use strict";
var HttpError = require("errors").HttpError;

module.exports = function (req, res, next) {
	if (!req.user) {
		return next(new HttpError(401));
	}

	next();
};