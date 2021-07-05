'use strict'
export const sessionMiddleware = (req, res, next) => {
	res.locals.loggedIn = req.session.loggedIn;
	res.locals.loggedInUser = req.session.loggedInUser;
	next();
};
export const loginConfirmMiddleware = (req, res, next) => {
	if(!req.session.loggedIn){
		res.render("404", { pageTitle: "Login Please"});
	}else{
		next();
	};
};
export const cannotGetMiddeware = (err, req, res, next) => {
	if(res.status==404){
	res.render("404", {pageTitle: "Sorry wrong access link"});
	}else{
		console.log(err);
		next();
	};
};
