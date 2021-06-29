'use strict';
import express from 'express';
import { editProfile, getJoin, login, postJoin } from '../controllers/userController';

//variables
const userRouter = express.Router();

//routes 
userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.get("/login", login);
userRouter.get("/edit", editProfile);
export default userRouter;