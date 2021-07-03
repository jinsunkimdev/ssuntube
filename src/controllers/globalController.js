'use strict'
import User from "../models/User";
import Video from "../models/Video";
export const home = async(req, res) => {
	try{
	const users = await User.find({});
	const videos = await Video.find({});
	res.render('home', { pageTitle: "Home", users, videos});
	}catch(error){
		console.log("🏡Error from home" + error);
	} // find users collections all info
}// home