var mongoose = require("../lib/mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
	title: {type: String, require: true},
	subtitle: String,
	content: {type: String, required: true},
	rating: Number,
	created: {type: Date, default: Date.now},
	_owner: {type: Schema.ObjectId, ref: "User", required: true}
});

schema.statics.getPage = function (searchQuery, pageIndex, pageSize, callback) {
	var skip = (pageIndex - 1 ) * pageSize;

	this.find({"title": new RegExp(searchQuery, "i")})
		.populate({
			path: "_owner",
			select: "username",
			match: {"username": new RegExp(searchQuery, "i")}
		})
		.sort("-created")
		.skip(skip).limit(pageSize)
		.exec(callback);
};

exports.Article = mongoose.model("Article", schema);