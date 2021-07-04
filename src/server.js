'use strict'
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import session from 'express-session';
import helmet from 'helmet';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import { sessionMiddleware } from './localsMiddlewares';
import videoRouter from './routers/videoRouter';

//variables
const app = express();
const logger = morgan;
//set view engine and path
app.set('view engine', 'pug');
app.set('views', process.cwd() + "/src/views");
//express-session
app.set(process.env.SESSION_PROXY, process.env.SESSION_PROXY_NUMBER) // proxy setting
//helmet
app.use(helmet());
//cookieparser
app.use(cookieParser());
//express-session
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false, maxAge: 60000},
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
app.use("/videos", videoRouter);
app.use("/uploads",express.static("uploads"));
export default app;
