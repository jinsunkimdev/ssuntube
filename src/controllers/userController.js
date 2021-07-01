'use strict';
import User from "../models/User";
import bcrypt, { hash } from "bcrypt";
import { home } from "./globalController";
// variables
const saltRounds = 10;
// functions
export const getJoin = (req, res) => {
	res.render("join", { pageTitle: "Join"});
};// getJoin
export const postJoin = async(req, res) => {
	const { 
		username,
		userid,
		password,
	} = req.body;
	const confirmUserJoin = await User.exists({userId:userid});
	if(confirmUserJoin){
		res.render("join",{
		pageTitle: "Join",
		errorMessage: "Sorry, The user ID you have chosen is already in use. Choose another user ID🙇‍♀️"
		});
	}else{
		try{
		await bcrypt.hash(password, saltRounds, function(err, hash){
		User.create({
			userName:username,
			userId:userid,
			password:hash, // store hash password to db
			});
		});
		}catch{
			console.log(`error from JOIN page`);
		};
	};
		const users = await User.find({});
		res.redirect("/");
};// postJoin

export const getLogin = (req, res) => {
	res.render("login", { pageTitle: "Login" })
};// getLogin
export const postLogin = async(req, res) => {
	const { 
		userid,
		password
	} = req.body;// inpute value
	const confirmUserLogin = await User.exists({ userId:userid });// if exists, return true
	const hashFromDb = await User.findOne({ userId:userid }, 'password').exec();
	try{
	await bcrypt.compare(password, hashFromDb.password, async(err, result) => {
		if(result){
			if(confirmUserLogin){
			req.session.loggedIn = true;
<<<<<<< HEAD
			req.session.loggedInUser = await User.findOne({userId:userid}, 'userName userId password').exec();
=======
			console.log(req.session.loggedIn);
			console.log(req.session);
			console.log("login success!");
>>>>>>> 5e8489be55cbf4ea584feea9212d9b223f7675cd
			res.redirect("/");
			}else{
			console.log("login failed");
			res.render("login", {errorMessage:
				"The ID is not correct.🙅"
			})};
		}else{
			res.render("login", {
				pageTitle: "Login", errorMessage: "The ID/PASSWORD is incorrect🙅‍♀️"
			});
				console.log("password incoreect");
		}});
	}catch{
		res.render("login", {
			pageTitle: "Login", errorMessage: "Check your ID/PASSWORD please.🙇‍♂️"
		});
	};
};// postLogin
export const getEditProfile = (req, res) => {
	res.render("edit", { pageTitle: "Edit Profile"});
};// getEditProfile
export const postEditProfile = async(req, res) => {
	const { username, userid } = req.body;
	try{		
		await User.findOneAndUpdate(username, { userName: username });
		await User.findOneAndUpdate(userid, { userId: userid});
		res.redirect("/");
	}catch(err){
		console.log(err);
	};
};// postEditProfile

export const getEditPassword = (req, res) => {
	res.render("editPassword", { pageTitle: "Change Password"})
};// getEditPassword
export const postEditPassword = async(req, res) => {
	const { password } = req.body;
	const originalPassword = req.session.loggedInUser.password;
	const userid = req.session.loggedInUser.userId;
	try{ 
		await bcrypt.hash(password, saltRounds, async(err, hash) => {
		await User.findOneAndUpdate(userid, { password: hash });
		})
		res.redirect("/");
	}catch(err){
		console.log(err);
	};
};// postEditPassword

export const logout = (req, res) => {
	req.session.destroy(function(err){
		req.session;
	});
	res.redirect("/");
};// logout
