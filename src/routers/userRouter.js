'use strict';
import express from 'express';
import multer from 'multer';
import { 
	getJoin,postJoin,
	getLogin,postLogin,logout,
	getEditProfile,postEditProfile,
	getEditPassword,postEditPassword,
	userDetail
} from '../controllers/userController';
import { loginConfirmMiddleware } from '../localsMiddlewares';
//variables
const userRouter = express.Router();
const eventDate = new Date(Date.now());
const dateStrArray = eventDate.toISOString().split("-");
const dateStrArraySeconds = dateStrArray[2].split(":");
const avatarUploadsTime = dateStrArray[0]+dateStrArray[1]+dateStrArraySeconds[0]+dateStrArraySeconds[1]+
dateStrArraySeconds[2].substr(0,2);
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/avatar');
	},
	filename: function (req, file, cb) {
	cb(null, req.session.loggedInUser.userId + '_' + avatarUploadsTime);
	},
});
const upload = multer({ storage: storage });
//routes 
userRouter.route("/join").get(getJoin).post(postJoin);// Join
userRouter.route("/login").get(getLogin).post(postLogin);
userRouter.get("/logout", loginConfirmMiddleware,logout);
userRouter.get("/:id([A-Fa-f0-9]{24})", userDetail);
userRouter.route("/editProfile").get(loginConfirmMiddleware, getEditProfile).post(upload.single('profileImg'), postEditProfile);
userRouter.route("/editPassword").get(loginConfirmMiddleware, getEditPassword).post(postEditPassword);
export default userRouter;