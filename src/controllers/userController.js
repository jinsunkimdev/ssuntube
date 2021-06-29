'use strict';
export const getJoin = (req, res) => {
	res.render("join", { pageTitle: "Join"});
};

export const postJoin = (req, res) => {
	console.log("req.body=" + req.body.username);
	res.redirect("/");
};

export const login = (req, res) => {
	res.render("login", { pageTitle: "Login"});
};

export const editProfile = (req, res) => {
	res.render( "edit", { pageTitle: "Edit Profile"});
};