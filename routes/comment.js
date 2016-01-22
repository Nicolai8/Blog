var express = require("express");
var router = express.Router();
var async = require("async");
var HttpError = require("../errors").HttpError;
var Comment = require("../models/UnitOfWork").Comment;

//save comment
router.post("/", function (req, res, next) {
	if(!req.body.newComment) return next(new HttpError(400));

	var comment = new Comment({
		text: req.body.newComment,
		_owner: req.user.get("_id"),
		_article: req.body.articleId
	});
	comment.save(function (err, comment) {
		if (err) return next(err);

		comment = comment.toObject();
		comment._owner = {
			_id: req.user.get("_id"),
			username: req.user.get("username")
		};
		res.json(comment);
	});
});

//remove comment
router.delete("/:id", function (req, res, next) {
	Comment.findByIdAndRemove(req.params.id, function (err) {
		if (err) return next(err);

		res.json("ok");
	});
});

//edit comment
router.put("/:id", function (req, res, next) {
	async.waterfall([
		function (cb) {
			Comment.findById(req.params.id, cb);
		},
		function (comment, cb) {
			if (comment == null) return cb(new HttpError(404));
			if (comment.get("_owner").toString() != req.user.get("_id").toString()) return cb(new HttpError(401));

			Comment.findByIdAndUpdate(
				req.params.id, {
					text: req.body.newComment
				}, cb);
		}
	], function (err, comment) {
		if (err) return next(err);

		res.json(comment);
	});
});

module.exports = router;