var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
	res.render("index", {title: "Express"});
});

router.post("/login", require("./auth"));
router.post("/logout", require("./logout"));
router.use("/article", require("./article"));
router.use("/comment", require("./comment"));
router.use("/profile", require("./profile"));

module.exports = router;