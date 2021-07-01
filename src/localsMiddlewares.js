'use strict'
export const sessionMiddleware = (req, res, next) => {
	res.locals.loggedIn = req.session.loggedIn;
	res.locals.loggedInUser = req.session.loggedInUser;
	next();
};