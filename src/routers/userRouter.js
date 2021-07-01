'use strict';
import express from 'express';
import { 
	getJoin,postJoin,
	getLogin,postLogin,logout,
	getEditProfile,postEditProfile,
	getEditPassword,postEditPassword
} from '../controllers/userController';

//variables
const userRouter = express.Router();

//routes 
userRouter.route("/join").get(getJoin).post(postJoin);// Join
userRouter.route("/login").get(getLogin).post(postLogin);
userRouter.get("/logout", logout);
userRouter.route("/editProfile").get(getEditProfile).post(postEditProfile);
userRouter.route("/editPassword").get(getEditPassword).post(postEditPassword);
export default userRouter;