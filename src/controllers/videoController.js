'use strict';

export const getUploadVideo = (req, res) => {
	res.render("uploadVideo", { pageTitle: "Upload your video!"});
}
export const postUploadVideo = (req, res) => {
	console.log(req.file);
	res.redirect("/");
}