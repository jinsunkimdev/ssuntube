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
	res.render("login", { pageTitle: "Login" })
};
export const postLogin = async(req, res) => {
	const { 
		userid,
		password
	} = req.body;// inpute value
	const confirmUser = await User.exists({ userId:userid });// if exists, return true
	const hashFromDb = await User.findOne({ userId:userid }, 'password').exec();
	await bcrypt.compare(password, hashFromDb.password, function(err, result) {
		if(result){
			if(confirmUser){
			req.session.loggedIn = true;
			console.log(req.session.loggedIn);
			console.log("login success!");
			res.redirect("/");
			}else{
			console.log("login failed");
			res.render("login", {errorMessage:
				"An internal error occurred. Please contact your system administrator.🙇"
			})};
		}else{
		console.log(err);
		}});
};

export const logout = (req, res) => {
	req.session.destroy(function(err){
		req.session;
	});
	res.redirect("/");
};

export const editProfile = (req, res) => {
	res.render( "edit", { pageTitle: "Edit Profile"});
};