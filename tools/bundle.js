"use strict";
var config = require("./config");
var path = require("path");
var Builder = require("systemjs-builder");

let SYSTEM_BUILDER_CONFIG = {
	map: {
		"rxjs": "node_modules/rxjs",
		"@angular": "node_modules/@angular"
	},
	defaultJSExtensions: true,
	packageConfigPaths: [
		path.join(".", "node_modules", "*", "package.json"),
		path.join(".", "node_modules", "@angular", "*", "package.json")
	]
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