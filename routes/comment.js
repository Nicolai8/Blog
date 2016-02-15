"use strict";
var express = require("express");
var router = express.Router();
var isCommentOwner = require("middleware/isOwner")("comment");
var HttpError = require("errors").HttpError;
var commentService = require("services/commentService");
var checkAuth = require("middleware/checkAuth");

//get comments by Article Id
router.get("/getByArticleId/:id", function (req, res, next) {
	commentService.getByArticleId(req.params.id)
		.then(res.json)
		.catch(next);
});

//save comment
router.post("/", checkAuth, function (req, res, next) {
	if (!req.body.newComment) return next(new HttpError(400));

	commentService.create(req.user.get("_id"), req.body)
		.then((comment)=> {
			comment = comment.toObject();
			comment._owner = {
				_id: req.user.get("_id"),
				username: req.user.get("username")
			};

			emitSocketIOEvent(req, "commentAdded");
			res.json(comment);
		})
		.catch(next);
});

//remove comment
router.delete("/:id", checkAuth, isCommentOwner, function (req, res, next) {
	commentService.delete(req.params.id)
		.then(()=> {
			emitSocketIOEvent(req, "commentDeleted");
			res.json({});
		})
		.catch(next);
});

//edit comment
router.put("/:id", checkAuth, isCommentOwner, function (req, res, next) {
	commentService.update(req.params.id, {
			text: req.body.newComment
		})
		.then((comment)=> {
			emitSocketIOEvent(req, "commentUpdated");
			res.json(comment);
		})
		.catch(next);
});

function emitSocketIOEvent(req, eventName) {
	var clients = req.app.get("io").sockets.connected;

	Object.keys(clients).forEach(function (key) {
		var client = clients[key];
		if (client.client.id !== (req.body.socketId || req.query.socketId)) {
			client.emit(eventName, "");
		}
	});
}

module.exports = router;