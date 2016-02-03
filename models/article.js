var mongoose = require("lib/mongoose");
var async = require("async");
var Schema = mongoose.Schema;

var schema = new Schema({
	title: {type: String, require: true},
	subtitle: String,
	content: {type: String, required: true},
	created: {type: Date, default: Date.now},
	_owner: {type: Schema.ObjectId, ref: "User", required: true}
});

schema.statics.getPage = function (searchQuery, pageIndex, pageSize, callback) {
	var skip = (pageIndex - 1 ) * pageSize;
	var Article = this;

	async.waterfall([
		function (cb) {
			mongoose.models.User.find({"username": new RegExp(searchQuery, "i")}).select("_id").exec(cb);
		},
		function (users, cb) {
			Article.find({
					$or: [
						{"title": new RegExp(searchQuery, "i")},
						{
							"_owner": {
								$in: users
							}
						}
					]
				})
				.populate({
					path: "_owner",
					select: "username"
				})
				.sort("-created")
				.select("-content")
				.skip(skip).limit(pageSize)
				.exec(cb);
		}
	], callback);
};

schema.statics.getPageByUserId = function (userId, pageIndex, pageSize, callback) {
	var skip = (pageIndex - 1 ) * pageSize;

	this.find({"_owner": userId})
		.populate({
			path: "_owner",
			select: "username"
		})
		.sort("-created")
		.skip(skip).limit(pageSize)
		.exec(callback);
};

exports.Article = mongoose.model("Article", schema);