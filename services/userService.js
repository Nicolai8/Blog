"use strict";
var User = require("models/UnitOfWork").User;
var ratingService = require("./ratingService");
var articleService = require("./articleService");
var commentService = require("./commentService");

module.exports = {
	"get": function (searchQuery) {
		return User.find({"username": new RegExp(searchQuery, "i")})
			.select("_id")
			.exec();
	},
	getById: function (id) {
		return User.getProfile(id);
	},
	getByUsername: function (username) {
		return User.findOne({username: username});
	},
	getByOauthId: function (id, type) {
		return User.findOne(`oauth.${type}`, id);
	},
	create: function (newUserProperties) {
		let user = new User(newUserProperties);
		return user.save();
	},
	update: function (id, propertiesToUpdate) {
		return User.findByIdAndUpdate(id, propertiesToUpdate);
	},
	"delete": function (id) {
		return Promise.all([
			articleService.deleteByUserId(id),
			commentService.deleteByUserId(id),
			ratingService.deleteByUserId(id),
			User.findByIdAndRemove(id)
		])
	}
};