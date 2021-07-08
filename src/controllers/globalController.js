'use strict'
import User from "../models/User";
import Video from "../models/Video";
export const home = async(req, res) => {
	try{
	const users = await User.find({});
	const videos = await Video.find({});
	const videoCreator = await User.findOne({ObjectId: videos.createdBy}, 'userName')
	console.log(videoCreator.userName);
	res.render('home', { pageTitle: "Home", users, videos, videoCreator});
	}catch(error){
		console.log("🏡Error from home" + error);
	} // find users collections all info
}// home