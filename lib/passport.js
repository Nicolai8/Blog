var async = require("async");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var config = require("../config");
var UnitOfWork = require("../models/UnitOfWork");
var AuthError = require("../errors").AuthError;
var HttpError = require("../errors").HttpError;

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	UnitOfWork.User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy(function (username, password, done) {
	async.waterfall([
		function (cb) {
			UnitOfWork.User.findOne({username: username}, cb);
		},
		function (user, cb) {
			if (user) {
				if (user.checkPassword(password)) {
					cb(null, user);
				} else {
					cb(new AuthError("Incorrect password"));
				}
			} else {
				var user = new UnitOfWork.User({username: username, password: password});
				user.save(function (err) {
					if (err) return cb(err);
					cb(null, user);
				});
			}
		}
	], done);
}));

var authenticateFacebookCallback = authenticateFacebook = function (req, res, next) {
	next();
};


if (config.get("oauth:facebook:clientId") && config.get("oauth:facebook:clientSecret")) {
	passport.use(new FacebookStrategy({
			clientID: config.get("oauth:facebook:clientId"),
			clientSecret: config.get("oauth:facebook:clientSecret"),
			callbackURL: config.get("oauth:facebook:callbackUrl")
		},
		function (accessToken, refreshToken, profile, done) {
			async.waterfall([
				function (cb) {
					UnitOfWork.User.findOne({"oauth.facebook": profile.id}, cb);
				},
				function (user, cb) {
					if (user) {
						cb(null, user);
					} else {
						var newUser = new UnitOfWork.User({
							username: profile.id + profile.displayName.replace(" ", ""),
							oauth: {
								facebook: profile.id
							},
							password: "123"
						});
						newUser.save(cb);
					}
				}
			], function (a, b, c) {
				done(a, b, c);
			});
		}
	));

	authenticateFacebook = passport.authenticate("facebook", {scope: ["email"]});
	authenticateFacebookCallback = passport.authenticate("facebook", {failureRedirect: "/#/error/500"});
}

exports.authenticate = function authenticate(req, res, next) {
	passport.authenticate("local", function (err, user) {
		if (err) {
			if (err instanceof AuthError) {
				return next(new HttpError(403, err.message));
			}
			return next(err);
		}

		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}

			//req.session.user = user;
			res.json({
				username: user.get("username"),
				_id: user.get("_id")
			});
		});
	})(req, res, next);
};

exports.authenticateFacebook = authenticateFacebook;
exports.authenticateFacebookCallback = authenticateFacebookCallback;