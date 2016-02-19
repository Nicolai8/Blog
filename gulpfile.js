"use strict";
var gulp = require("gulp");
var path = require("path");
var watch = require("gulp-watch");
var runSequence = require("run-sequence");

var config = require("tools/config");
var buildJs = require("tools/build.js");
var clean = require("tools/clean");
var copyHtml = require("tools/copy.html");
var bundle = require("tools/bundle");

gulp.task("clean", clean(gulp));

gulp.task("copy.html.dev", copyHtml.dev(gulp));

gulp.task("build.js.dev", buildJs.dev(gulp));

gulp.task("build.dev", ["clean"], function (callback) {
	runSequence(["build.js.dev", "copy.html.dev"], callback);
});

gulp.task("build.dev.watch", ["build.dev"], function () {
	watch(path.join(config.APP_SRC, "**/*.ts"), () => gulp.start("build.js.dev"));
	watch(path.join(config.APP_SRC, "**/*.html"), () => gulp.start("copy.html.dev"));
});

gulp.task("build.js.prod", ["clean"], buildJs.prod(gulp));

gulp.task("build.bundle.prod", ["build.js.prod"], bundle.prod(gulp));

gulp.task("build.js.test", buildJs.test(gulp));

gulp.task("build.test", ["clean"], function(callback){
	runSequence(["build.js.test", "copy.html.dev"], callback);
});