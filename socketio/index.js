"use strict";
module.exports = function (server) {
	let io = require("socket.io")({
		"origins": "localhost:*"
	});
	io.listen(server);

	io.on("connection", function (socket) {
	});

	return io;
};