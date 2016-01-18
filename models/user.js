var crypto = require("crypto");
var async = require("async");
//var AuthError = require("error/authError");

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
	created: {
		type: Date,
		default: Date.now
	}
});

schema.methods.encryptPassword = function (password) {
	return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
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

schema.statics.authorize = function (username, password, callback) {
	var User = this;

	async.waterfall([
		function (cb) {
			User.findOne({username: username}, cb);
		},
		function (user, cb) {
			if (user) {
				if (user.checkPassword(password)) {
					cb(null, user);
				} else {
					cb(new Error("Incorrect password"));
				}
			} else {
				var user = new User({username: username, password: password});
				user.save(function (err) {
					if (err) return cb(err);
					cb(null, user);
				});
			}
		}
	], callback);
};

exports.User = mongoose.model("User", schema);