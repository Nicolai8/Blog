"use strict";
var Comment = require("models/UnitOfWork").Comment;

module.exports = {
	getByArticleId: function (articleId) {
		return Comment.find({"_article": articleId})
			.populate("_owner", "username")
			.exec();
	},
	create: function (userId, newCommentProperties) {
		let comment = new Comment({
			text: newCommentProperties.newComment,
			_owner: userId,
			_article: newCommentProperties.articleId
		});
		return comment.save()
	},
	update: function (id, propertiesToUpdate) {
		return Comment.findByIdAndUpdate(id, propertiesToUpdate);
	},
	"delete": function (id) {
		return Comment.findByIdAndRemove(id);
	},
	deleteByArticleId: function (articleId) {
		return Comment.remove({"_article": articleId});
	},
	deleteByUserId: function (userId) {
		return Comment.remove({"_owner": userId});
	}
};