'use strict';

import User from "../models/User";
import Video from "../models/Video";

export const getUploadVideo = (req, res) => {
	res.render("uploadVideo", { pageTitle: "Upload your video!"});
};
export const postUploadVideo = async(req, res) => {
	const loggedInUserId = req.session.loggedInUser._id;
	const { videoTitle, description } = req.body;
	const newVideo = await Video.create({
		videoTitle,
		description,
		fileUrl:req.file.path,
		createdBy:loggedInUserId,
	})
	const user = await User.findById(loggedInUserId);
	user.createdVideo.push(newVideo._id);
	res.redirect("/");
};

export const getWatch = async(req, res) => {
	const {id} = req.params;
	const userId = req.session.loggedInUser._id;
	//const createdUser = await User.findById(createdUserId.createdBy).exec();
	const videoCreator= await Video.findById(id).populate('createdBy');
	const createdVideo = await User.findById(userId).populate('createdVideo');
	console.log(createdVideo);
	if(!videoCreator){
		res.render("404", { pageTitle: "Sorry Nothing Found🙏"});
	}else{
	res.render("watchVideo", { pageTitle: "Watch", videoCreator});
	};
};