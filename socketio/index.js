module.exports = function (server) {
	var io = require("socket.io")({
		"origins": "localhost:*"
	});
	io.listen(server);

	io.on("connection", function (socket) {
	});

	return io;
};