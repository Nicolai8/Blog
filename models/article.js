"use strict";
var mongoose = require("lib/mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
	title: {type: String, require: true},
	subtitle: String,
	content: {type: String, required: true},
	created: {type: Date, default: Date.now},
	_owner: {type: Schema.ObjectId, ref: "User", required: true}
});

schema.statics.getPage = function (searchQuery, pageIndex, pageSize) {
	var skip = (pageIndex - 1 ) * pageSize;
	var Article = this;

	return mongoose.models.User.find({"username": new RegExp(searchQuery, "i")}).select("_id").exec()
		.then((users)=> {
			return Article.find({
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
				.exec();
		});
};

schema.statics.getPageByUserId = function (userId, pageIndex, pageSize) {
	var skip = (pageIndex - 1 ) * pageSize;

	return this.find({"_owner": userId})
		.populate({
			path: "_owner",
			select: "username"
		})
		.sort("-created")
		.skip(skip).limit(pageSize)
		.exec();
};

schema.statics.getArticleById = function(articleId){
	let Article = this;
	let Comment = mongoose.models.Comment;
	let Rating = mongoose.models.Rating;

	return Promise.all([
		Article.findById(articleId)
			.populate([{
				path: "_owner",
				select: "username"
			}]).exec(),
		Comment.find({"_article": articleId}).populate("_owner", "username").exec(),
		Rating.aggregate({
				$match: {"_article": mongoose.Types.ObjectId(articleId)}
			}, {
				$group: {
					_id: null,
					"ratingValue": {$avg: "$rating"},
					"ratingCount": {$sum: 1}
				}
			}
		).exec()
	]);
};

exports.Article = mongoose.model("Article", schema);