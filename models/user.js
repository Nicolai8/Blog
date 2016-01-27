var crypto = require("crypto");
var async = require("async");
var AuthError = require("../errors").AuthError;

var mongoose = require("../lib/mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
	username: {
		type: String,
		unique: true,
		require: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		require: true
	},
	oauth: {
		facebook: "",
		vk: ""
	},
	email: String,
	birthday: Date,
	gender: String,
	about: String,
	pictureUrl: String,
	created: {
		type: Date,
		default: Date.now
	}
});

schema.methods.encryptPassword = function (password) {
	return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
};

schema.statics.getProfile = function (id, callback) {
	this.findById(id).select("-hashedPassword -salt").exec(callback);
};

schema.virtual("password")
	.set(function (password) {
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function () {
		return this._plainPassword;
	});

schema.methods.checkPassword = function (password) {
	return this.encryptPassword(password) === this.hashedPassword;
};

exports.User = mongoose.model("User", schema);