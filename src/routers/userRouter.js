'use strict';
import express from 'express';
import { editProfile, join, login } from '../controllers/userController';

//variables
const userRouter = express.Router();

//routes 
userRouter.get("/join", join);
userRouter.get("/login", login);
userRouter.get("/edit", editProfile);
export default userRouter;