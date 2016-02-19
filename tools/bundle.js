"use strict";
var config = require("./config");
var path = require("path");
var Builder = require("systemjs-builder");

const SYSTEM_BUILDER_CONFIG = {
	defaultJSExtensions: true,
	paths: {
		"public/js/tmp/*": `${config.TMP_DEST}/*`,
		"*": `node_modules/*`
	}
};

const BUNDLER_OPTIONS = {
	format: "cjs",
	minify: true,
	mangle: false
};

exports.prod = function (gulp) {
	return function (callback) {
		let builder = new Builder(SYSTEM_BUILDER_CONFIG);
		builder.buildStatic(
			path.join(config.TMP_DEST, "app", config.BOOTSTRAP),
			path.join(config.APP_DEST, "app", `${config.BOOTSTRAP}.js`),
			BUNDLER_OPTIONS)
			.then(()=> {
				callback();
			});
	}
};