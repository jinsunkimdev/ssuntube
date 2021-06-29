'use strict';
import User from "../models/User";
import bcrypt, { hash } from "bcrypt";
// variables
const saltRounds = 10;
// functions
export const getJoin = (req, res) => {
	res.render("join", { pageTitle: "Join"});
};
export const postJoin = async(req, res) => {
	const { 
		username,
		userid,
		password,
	} = req.body;
	await bcrypt.hash(password, saltRounds, function(err, hash) {
		if(err){
			console.log(err);
		}else{
		User.create({
			userName:username,
			userId:userid,
			password:hash, // store hash password to db
			});
		}
		res.redirect("/");
	});
};

export const getLogin = (req, res) => {
	req.session.loggedIn = false; // login session
	res.render("login", { pageTitle: "Login" })
};
export const postLogin = async(req, res) => {
	const { 
		userid,
		password
	} = req.body;
	await bcrypt.hash(password, saltRounds, function(err, hash){
		if(err){
			console.log(err);
		}else{
			console.log(hash);
			password = hash;
		};
	});
	const confirmUser = await User.exists({ userid, password });
	if(confirmUser){
		req.session.loggedIn = true;
		console.log("login success");
		res.redirect("/");
	}else{
		console.log("login failed");
		res.render("login", {pageTitle: "Login Error!"});
	};
}

export const login = (req, res) => {
	res.render("login", { pageTitle: "Login"});
};

export const editProfile = (req, res) => {
	res.render( "edit", { pageTitle: "Edit Profile"});
};