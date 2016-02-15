"use strict";
var Rating = require("models/UnitOfWork").Rating;
var mongoose = require("lib/mongoose");

module.exports = {
	getByArticleId: function (articleId) {
		return Rating.aggregate({
				$match: {"_article": mongoose.Types.ObjectId(articleId)}
			}, {
				$group: {
					_id: null,
					"ratingValue": {$avg: "$rating"},
					"ratingCount": {$sum: 1}
				}
			}
		).exec();
	},
	getRatingForUser: function (articleId, userId) {
		return Rating.findOne({
			_article: articleId,
			_owner: userId
		});
	},
	update: function (rating, userId, articleId) {
		return this.getRatingForUser(articleId, userId)
			.then((rating)=> {
				if (rating !== null) {
					return Rating.findByIdAndUpdate(rating.get("_id"), {rating: rating});
				}
				var newRating = new Rating({
					"_owner": userId,
					"_article": articleId,
					"rating": rating
				});
				return newRating.save();
			}).then(()=> {
				return this.getByArticleId(articleId);
			});
	},
	deleteByArticleId: function (articleId) {
		return Rating.remove({"_article": articleId});
	},
	deleteByUserId: function (userId) {
		return Rating.remove({"_owner": userId});
	}
};