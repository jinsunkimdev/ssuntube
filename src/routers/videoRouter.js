'use strict';
import express from 'express';
import multer from 'multer';
import { getUploadVideo, postUploadVideo } from '../controllers/videoController';
// variables
const eventDate = new Date(Date.now());
const dateStrArray = eventDate.toISOString().split("-");
const dateStrArraySeconds = dateStrArray[2].split(":");
const videoUploadsTime = dateStrArray[0]+dateStrArray[1]+dateStrArraySeconds[0]+dateStrArraySeconds[1]+
dateStrArraySeconds[2].substr(0,2);
const videoRouter = express.Router();
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
	cb(null, file.fieldname + '-' + videoUploadsTime);
	},
});
const upload = multer({ storage: storage });
// routes
videoRouter.route("/uploadVideo").get(getUploadVideo).post(upload.single('videoFile'),postUploadVideo);
export default videoRouter;