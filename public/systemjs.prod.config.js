(function (global) {
	var config = {
		map: {
			"app": "js/app",
			"rxjs": "node_modules/rxjs",
			"@angular": "node_modules/@angular"
		},
		packages: {
			"app": {defaultExtension: "js", format: "cjs"}
		},
		packageConfigPaths: [
			"/node_modules/*/package.json",
			"/node_modules/@angular/*/package.json"
		]
	};

	if (global.filterSystemConfig) {
		global.filterSystemConfig(config);
	}

	System.config(config);
})(this);