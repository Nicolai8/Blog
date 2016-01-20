var express = require("express");
var router = express.Router();
var Comment = require("../models/UnitOfWork").Comment;

//save comment
router.post("/", function (req, res, next) {
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
	Comment.findByIdAndUpdate(
		req.params.id, {
			text: req.body.newComment
		},
		function (err, comment) {
			if (err) return next(err);

			res.json(comment);
		});
});

module.exports = router;