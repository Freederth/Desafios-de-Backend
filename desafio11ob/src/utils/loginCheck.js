const loginCheck = (req, res, next) => {
	if (!req.session.name) {
		res.redirect("/login");
	} else {
		return next();
	}
};
module.exports = loginCheck;
