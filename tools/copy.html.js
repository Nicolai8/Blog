"use strict";
var path = require("path");
var config = require("./config");

exports.dev = function (gulp) {
	return function () {
		return gulp.src(path.join(config.APP_SRC, "**/*.html"))
			.pipe(gulp.dest(config.APP_DEST));
	}
};