var mongoose = require("lib/mongoose");
var async = require("async");

async.series([
	open,
	dropDatabase,
	requireModels,
	createUsers,
	createArticles
], function (err) {
	mongoose.disconnect();
	process.exit(err ? 255 : 0);
});

function open(callback) {
	mongoose.connection.on("open", callback);
}

function dropDatabase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels(callback) {
	require("./models/UnitOfWork");

	async.each(Object.keys(mongoose.models), function (modelName, cb) {
		mongoose.models[modelName].ensureIndexes(cb);
	}, callback);
}

function createUsers(callback) {
	var user = new mongoose.models.User({username: "admin", password: "admin"});
	user.save(callback);
}

function createArticles(callback) {
	mongoose.models.User.findOne({}, function (err, user) {
		if (err) return callback(err);

		var articles = [
			{
				title: "Article 1",
				content: "<h1>Article 1</h1>",
				_owner: user._id
			},
			{
				title: "Article 2",
				content: "<h2>Article 2</h2>",
				_owner: user._id
			}
		];

		async.each(articles, function (articleData, cb) {
			var article = new mongoose.models.Article(articleData);
			article.save(cb);
		}, callback);
	})
}