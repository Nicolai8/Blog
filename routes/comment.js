"use strict";
var express = require("express");
var router = express.Router();
var isCommentOwner = require("middleware/isOwner")("comment");
var HttpError = require("errors").HttpError;
var Comment = require("models/UnitOfWork").Comment;
var checkAuth = require("middleware/checkAuth");

//get comments by Article Id
router.get("/getByArticleId/:id", function (req, res, next) {
	Comment.find({
		_article: req.params.id
	}).populate("_owner", "username")
		.exec()
		.then((comments)=> {
			res.json(comments);
		}).catch((err)=> {
		next(err);
	});
});

//save comment
router.post("/", checkAuth, function (req, res, next) {
	if (!req.body.newComment) return next(new HttpError(400));

	var comment = new Comment({
		text: req.body.newComment,
		_owner: req.user.get("_id"),
		_article: req.body.articleId
	});

	comment.save()
		.then((comment)=> {
			comment = comment.toObject();
			comment._owner = {
				_id: req.user.get("_id"),
				username: req.user.get("username")
			};

			emitSocketIOEvent(req, "commentAdded");
			res.json(comment);
		}).catch((err)=> {
		next(err)
	});
});

//remove comment
router.delete("/:id", checkAuth, isCommentOwner, function (req, res, next) {
	Comment.findByIdAndRemove(req.params.id).then(()=> {
		emitSocketIOEvent(req, "commentDeleted");
		res.json("ok");
	}).catch((err)=> {
		next(err)
	});
});

//edit comment
router.put("/:id", checkAuth, isCommentOwner, function (req, res, next) {
	Comment.findByIdAndUpdate(
		req.params.id, {
			text: req.body.newComment
		})
		.then((comment)=> {
			emitSocketIOEvent(req, "commentUpdated");
			res.json(comment);
		}).catch((err)=> {
		next(err)
	});
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