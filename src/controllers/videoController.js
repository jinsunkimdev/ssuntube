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
	})
	console.log(req.file);
	res.redirect("/");
};

export const getWatch = async(req, res) => {
	console.log(req.params.id)
	const {id} = req.params;
	const videos = await Video.findById(id);
	console.log(videos);
	res.render("watchVideo", { pageTitle: "Watch", videos});
};