"use strict";
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var config = require("../config");
var userService = require("services/userService");
var AuthError = require("errors").AuthError;
var HttpError = require("errors").HttpError;

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	userService.getById(id)
		.then((user)=> {
			done(null, user);
		})
		.catch(done);
});

passport.use(new LocalStrategy(function (username, password, done) {
	userService.getByUsername(username)
		.then((user)=> {
			if (user) {
				if (user.checkPassword(password)) {
					return Promise.resolve(user);
				} else {
					return Promise.reject(new AuthError("Incorrect password"));
				}
			} else {
				return userService.create({username: username, password: password});
			}
		})
		.then((user)=> {
			done(null, user);
		})
		.catch(done);
}));

var authenticateFacebookCallback = function (req, res, next) {
	next();
};
var authenticateFacebook = authenticateFacebookCallback;

if (config.get("oauth:facebook:clientId") && config.get("oauth:facebook:clientSecret")) {
	passport.use(new FacebookStrategy({
			clientID: config.get("oauth:facebook:clientId"),
			clientSecret: config.get("oauth:facebook:clientSecret"),
			callbackURL: config.get("oauth:facebook:callbackUrl")
		},
		function (accessToken, refreshToken, profile, done) {
			userService.getByOauthId(profile.id, "facebook")
				.then((user)=> {
					if (user) {
						return Promise.resolve(user);
					} else {
						return userService.create({
							username: profile.id + profile.displayName.replace(" ", ""),
							oauth: {
								facebook: profile.id
							},
							password: "123"
						});
					}
				})
				.then((user, c)=> {
					done(null, user, c);
				})
				.catch(done);
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