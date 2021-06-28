'use strict'
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
dotenv.config();
//variables
const app = express();
const logger = morgan;
//set view engine and path
app.set('view engine', 'pug');
app.set('views', process.cwd() + "/src/views");
//logger(morgan)
app.use(logger('dev'));
//routers
app.use("/", globalRouter);
app.use("/users", userRouter);
export default app;
