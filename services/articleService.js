"use strict";
var Article = require("models/UnitOfWork").Article;
var ratingService = require("./ratingService");
var commentService = require("./commentService");
var mongoose = require("lib/mongoose");

module.exports = {
	"get": function (searchQuery, page, pageSize) {
		let skip = (page - 1 ) * pageSize;

		return require("./userService").get(searchQuery)
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
	},
	getById: function (id) {
		return Promise.all([
			Article.findById(id)
				.populate([{
					path: "_owner",
					select: "username"
				}]).exec(),
			commentService.getByArticleId(id),
			ratingService.getByArticleId(id)
		]);
	},
	getPageByUserId: function (userId, pageIndex, pageSize) {
		return Article.getPageByUserId(userId, pageIndex, pageSize);
	},
	create: function (userId, newArticleProperties) {
		let article = new Article({
			title: newArticleProperties.title,
			subtitle: newArticleProperties.subtitle || "",
			content: newArticleProperties.content,
			_owner: userId
		});
		return article.save();
	},
	update: function (id, propertiesToUpdate) {
		return Article.findByIdAndUpdate(id, propertiesToUpdate);
	},
	"delete": function (id) {
		return Promise.all([
			Article.findByIdAndRemove(id),
			commentService.deleteByArticleId(id),
			ratingService.deleteByArticleId(id)
		]);
	},
	deleteByUserId: function (userId) {
		return Article.find({
				"_owner": mongoose.Types.ObjectId(userId)
			})
			.then(function (articles) {
				let promises = [];
				for (let i = 0; i < articles.length; i++) {
					promises.push(this.delete(articles[i].get("_id")));
				}

				return Promise.all(promises);
			});
	}
};