"use strict";
var mongoose = require("lib/mongoose");
var Schema = mongoose.Schema;

let schema = new Schema({
	title: {type: String, require: true},
	subtitle: String,
	content: {type: String, required: true},
	created: {type: Date, default: Date.now},
	_owner: {type: Schema.ObjectId, ref: "User", required: true}
});

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

exports.Article = mongoose.model("Article", schema);