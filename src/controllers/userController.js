'use strict';
import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
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
		errorMessage: "Sorry, The user ID you have chosen is already in use. Choose another user ID๐โโ๏ธ"
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
			req.session.loggedInUser = await User.findOne({userId:userid}, 'userName userId password').exec();
			res.redirect("/");
			}else{
			res.render("login", {errorMessage:"The ID is not correct.๐"
			})};
		}else{
			res.render("login", {
				pageTitle: "Login", errorMessage: "The ID/PASSWORD is incorrect๐โโ๏ธ"
			});
				console.log("password incorect");
		}});
	}catch{
		res.render("login", {
			pageTitle: "Login", errorMessage: "Check your ID/PASSWORD please.๐โโ๏ธ"
		});
	};
};// postLogin
export const getEditProfile = (req, res) => {
	res.render("editProfile", { pageTitle: "Edit Profile"});
};// getEditProfile
export const postEditProfile = async(req, res) => {
	console.log('req.file.path = ' + req.file.path);
	const _id = req.session.loggedInUser._id;
	const { username, userid } = req.body;
	try{		
		await User.findOneAndUpdate(_id, { 
			userName: username, 
			userId: userid, 
			avatarUrl: req.file.path}, { new: true });
		if(User.exists({ userId: userid})){
			res.render("editProfile", { pageTitle: "Edit Profile", errorMessage: "UserID is already using"});
		}else{
		res.redirect("/");
		};
	}catch(err){
		console.log(err);
	};
};// postEditProfile

export const getEditPassword = (req, res) => {
	res.render("editPassword", { pageTitle: "Change Password"})
};// getEditPassword
export const postEditPassword = async(req, res) => {
	const { password } = req.body;
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
export const userDetail = async(req, res) => {
	const { id } = req.params;
	const userName = req.session.loggedInUser.userName;
	const userInfo = await User.findById(id).exec();
	const userVideo = await User.findById(id).populate('createdVideo');
	const createdVideo = userVideo.createdVideo;
	console.log('userVideo='+userVideo);
	res.render("userDetail", { pageTitle: `${userName}'s Page`, userInfo, createdVideo});
}
export const logout = (req, res) => {
	req.session.destroy(function(err){
		req.session;
	});
	res.redirect("/");
};// logout
export const githubLoginStart = (req, res) => {
	const baseUrl = "https://github.com/login/oauth/authorize";
	const config = {
		client_id:process.env.CLIENT_ID,
		allow_signup:false,
		scope:"read:user user:email",
	};
	const urlParams = new URLSearchParams(config).toString();
	const finalUrl = `${baseUrl}?${urlParams}`;
	return res.redirect(finalUrl);
};
export const githubLoginFinish = async(req, res) => {
	const baseUrl = "https://github.com/login/oauth/access_token";
	const config = {
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		code: req.query.code,
	};
	const params = new URLSearchParams(config).toString();
	const finalUrl = `${baseUrl}?${params}`;
	const tokenRequest = await (
		await fetch(finalUrl, {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
	})
	).json();
	if("access_token" in tokenRequest){
		//access api
		const {access_token} = tokenRequest;//access_token
		const apiUrl = "https://api.github.com";
		const userData = await (
			await fetch(`${apiUrl}/user`, {
			headers: {
				Authorization: `token ${access_token}`,
			},//send access_token to this url
		})//when the fetch comes back, can get JSON
		).json();
		console.log(userData);
		const emailData = await(
			await fetch(`${apiUrl}/user/emails`, {
			headers: {
				Authorization: `token ${access_token}`,
			},
		})
		).json();
		const emailObj = emailData.find(
			(email) => email.primary === true && email.verified === true);
		if(!emailObj){
			return res.redirect("/login");
		}
		const existingUser = await User.findOne({ email: emailObj.email });
		if(existingUser){
			req.session.loggedIn = true;
			req.session.user = existingUser;
			return res.redirect("/");
		}else{
			// create an account
		}
		req.session.loggedIn = true;
		req.session.loggedInUser = user;
		return res.redirect("/");
		}else {
		return res.redirect("/users/login");
	}
};
