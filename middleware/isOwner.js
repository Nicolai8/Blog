var HttpError = require("errors").HttpError;
var UnitOfWork = require("models/UnitOfWork");

module.exports = function (type) {
	switch (type) {
		case "article":
			return isArticleOwner;
		case "comment":
			return isCommentOwner;
	}
};

function isArticleOwner(req, res, next) {
	UnitOfWork.Article.findById(req.params.id).then((article)=> {
		if (article === null) return next(new HttpError(404));
		if (article.get("_owner").toString() !== req.user.get("_id").toString()) return next(new HttpError(401));
		next();
	}).catch(next);
}

function isCommentOwner(req, res, next) {
	UnitOfWork.Comment.findById(req.params.id).then((comment)=> {
		if (comment === null) return cb(new HttpError(404));
		if (comment.get("_owner").toString() !== req.user.get("_id").toString()) return next(new HttpError(401));

		next();
	}).catch(next);
}