'use strict';
export const join = (req, res) => {
	res.render("join", { pageTitle: "Join"});
}

export const login = (req, res) => {
	res.render("login", { pageTitle: "Login"});
}

export const editProfile = (req, res) => {
	res.render( "edit", { pageTitle: "Edit Profile"});
}