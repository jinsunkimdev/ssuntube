'use strict'
import express from 'express';
import { home } from '../controllers/globalController';
//variables
const globalRouter = express.Router();
//sent to routes
globalRouter.get("/", home);

export default globalRouter;