"use strict";
var mongoose = require("mongoose");
var config = require("config");

mongoose.Promise = require("bluebird");
mongoose.connect(config.get("mongoose:uri"), config.get("mongoose:options"));

module.exports = mongoose;