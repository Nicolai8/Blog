"use strict";
var path = require("path");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var inlineNg2Template = require("gulp-inline-ng2-template");
var tsProject = ts.createProject("tsconfig.json", {sortOutput: true});
var config = require("./config");

const TS_SRC_TEST = [
	"typings/main.d.ts",
	path.join(config.APP_SRC, "**/*.ts")
];

const TS_SRC = Array.prototype.concat(TS_SRC_TEST, [
	"!" + path.join(config.APP_SRC, "**/*.spec.ts"),
	"!" + path.join(config.APP_SRC, "**/*_spec.ts"),
	"!" + path.join(config.APP_SRC, "**/*.mock.ts")
]);

exports.dev = function (gulp) {
	return function () {
		let tsResult = gulp.src(TS_SRC)
			.pipe(sourcemaps.init())
			.pipe(ts(tsProject));

		return tsResult.js
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(config.APP_DEST));
	}
};

exports.prod = function (gulp) {
	return function () {
		var tsResult = gulp.src(TS_SRC)
			.pipe(sourcemaps.init())
			.pipe(inlineNg2Template({
				base: config.TMP_DEST,
				useRelativePaths: true,
				removeLineBreaks: true
			}))
			.pipe(ts(tsProject));

		return tsResult.js
			.pipe(gulp.dest(config.TMP_DEST));
	}
};

exports.test = function (gulp) {
	return function () {
		let tsResult = gulp.src(TS_SRC_TEST)
			.pipe(sourcemaps.init())
			.pipe(ts(tsProject));

		return tsResult.js
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(config.APP_DEST));
	}
};