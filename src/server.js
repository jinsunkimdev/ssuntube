'use strict'
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import session from 'express-session';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import { sessionMiddleware } from './localsMiddlewares';

//variables
const app = express();
const logger = morgan;
//set view engine and path
app.set('view engine', 'pug');
app.set('views', process.cwd() + "/src/views");
//cookieparser
app.use(cookieParser());
//express-session
app.set(process.env.SESSION_PROXY, process.env.SESSION_PROXY_NUMBER) // proxy setting
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true, maxAge: 60000},
}));
//res.locals middleware
app.use(sessionMiddleware);
//logger(morgan)
app.use(logger('dev'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//routers
app.use("/", globalRouter);
app.use("/users", userRouter);
export default app;
