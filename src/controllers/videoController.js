'use strict';

import Video from "../models/Video";

export const getUploadVideo = (req, res) => {
	res.render("uploadVideo", { pageTitle: "Upload your video!"});
};
export const postUploadVideo = async(req, res) => {
	const { videoTitle, description } = req.body;
	await Video.create({
		videoTitle,
		description,
		fileUrl:req.file.path,
		createdBy:req.session.loggedInUser._id,
	})
	console.log(req.file);
	Video.findOne({ _id: req.session.loggedInUser._id }).populate('userName').exec((err, data) => {
		console.log(data);
	      }); // 또는 populate({ path: 'bestFriend' })도 가능
	res.redirect("/");
};

export const getWatch = async(req, res) => {
	const {id} = req.params;
	const videos = await Video.findById(id);
	if(!videos){
		res.render("404", { pageTitle: "Sorry Nothing Found🙏"});
	}else{
	res.render("watchVideo", { pageTitle: "Watch", videos});
	};
};