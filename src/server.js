'use strict'
import express from 'express';
import morgan from 'morgan';
import {home} from './routes/globalRouter';
//variables
const app = express();
const logger = morgan;
const PORT = "5000";//port number
//set view engine and path
app.set('view engine', 'pug');
app.set('views', process.cwd() + "/src/views");
//logger(morgan)
app.use(logger('dev'));
//path
app.get("/", home);
//connect server
const serverListening = () => console.log(`🌊Sever is Listening on port${PORT}!🌊`);
app.listen(PORT, serverListening);