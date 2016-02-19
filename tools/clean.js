"use strict";
var path = require("path");
var clean = require("gulp-clean");
var config = require("./config");

module.exports = function(gulp){
	return function () {
		return gulp.src(config.APP_DEST).pipe(clean());
	};
};