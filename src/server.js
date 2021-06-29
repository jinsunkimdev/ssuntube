'use strict'
import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
//variables
const app = express();
const logger = morgan;
//set view engine and path
app.set('view engine', 'pug');
app.set('views', process.cwd() + "/src/views");
//logger(morgan)
app.use(logger('dev'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//routers
app.use("/", globalRouter);
app.use("/users", userRouter);
export default app;
