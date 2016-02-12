"use strict";
var util = require("util");

function AuthError(status, message) {
	Error.apply(this, arguments);
	Error.captureStackTrace(this, AuthError);

	this.message = message;
}

util.inherits(AuthError, Error);
AuthError.prototype.name = "AuthError";


module.exports = AuthError;