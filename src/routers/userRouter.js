'use strict';
import express from 'express';
import { editProfile, getJoin, getLogin, postLogin, postJoin, logout } from '../controllers/userController';

//variables
const userRouter = express.Router();

//routes 
userRouter.route("/join").get(getJoin).post(postJoin);// Join
userRouter.route("/login").get(getLogin).post(postLogin);
userRouter.get("/logout", logout);
userRouter.get("/edit", editProfile);
export default userRouter;