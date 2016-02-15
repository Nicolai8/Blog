"use strict";
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var config = require("config");
var sassMiddleware = require("node-sass-middleware");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var sessionStore = require("lib/sessionStore");
var sendHttpError = require("lib/sendHttpError.js");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev", {
	skip: function (req, res) {
		return res.statusCode < 400
	}
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: config.get("session:secret"),
	cookie: config.get("session:cookie"),
	store: sessionStore
}));

var passport = require("passport");
//configure passport
app.use(passport.initialize());
app.use(passport.session());

app.use(sassMiddleware({
	src: path.join(__dirname, "public/scss"),
	dest: path.join(__dirname, "public/css"),
	outputStyle: "compressed",
	sourceMap: true,
	//debug: true,
	prefix: "/css"
}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/bower_components", express.static(path.join(__dirname, "bower_components")));
if (app.get("env") === "development") {
	app.use(express.static(path.join(__dirname, "node_modules")));
}

require("routes")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		sendHttpError(err, req, res, next);
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	err.stack = "";
	sendHttpError(err, req, res, next);
});

module.exports = app;