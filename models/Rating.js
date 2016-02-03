var mongoose = require("lib/mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
	rating: {type: Number, required: true},
	created: {type: Date, default: Date.now},
	_owner: {type: Schema.ObjectId, ref: "User", required: true},
	_article: {type: Schema.ObjectId, ref: "Article", required: true}
});

exports.Rating = mongoose.model("Rating", schema);