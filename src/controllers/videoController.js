'use strict';

import Video from "../models/Video";

export const getUploadVideo = (req, res) => {
	res.render("uploadVideo", { pageTitle: "Upload your video!"});
}
export const postUploadVideo = async(req, res) => {
	const { videoTitle, description } = req.body;
	await Video.create({
		videoTitle,
		description,
		fileUrl:req.file.path,
	})
	console.log(req.file);
	res.redirect("/");
}