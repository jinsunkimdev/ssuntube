'use strict';
import express from 'express';
import multer from 'multer';
import { getUploadVideo, postUploadVideo, getWatch } from '../controllers/videoController';
import { loginConfirmMiddleware } from '../localsMiddlewares';
// variables
const videoRouter = express.Router();
const eventDate = new Date(Date.now());
const dateStrArray = eventDate.toISOString().split("-");
const dateStrArraySeconds = dateStrArray[2].split(":");
const videoUploadsTime = dateStrArray[0]+dateStrArray[1]+dateStrArraySeconds[0]+dateStrArraySeconds[1]+
dateStrArraySeconds[2].substr(0,2);
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/video');
	},
	filename: function (req, file, cb) {
	cb(null, req.session.loggedInUser.userId + '_' + videoUploadsTime);
	},
});
const upload = multer({ storage: storage });
// routes
videoRouter.route("/uploadVideo").get(loginConfirmMiddleware,getUploadVideo).post(upload.single("videoFile"), postUploadVideo);
videoRouter.get("/:id([A-Fa-f0-9]{24})", getWatch);
export default videoRouter;