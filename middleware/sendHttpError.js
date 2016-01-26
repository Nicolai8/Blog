var util = require("util");
module.exports = function (req, res, next) {
	res.sendHttpError = function (error) {
		res.status(error.status);
		if (res.req.headers["x-requested-with"] == "XMLHttpRequest") {
			error = {
				status: error.status,
				message: error.message,
				stack: error.stack || ""
			};
			res.json(error);
		} else {
			//res.redirect(util.format("/#/error/%s?message=%s&stack=%s", error.status, error.message, error.stack || ""));
			res.render("error", {error: error, message: error.message});
		}
	};

	next();
};