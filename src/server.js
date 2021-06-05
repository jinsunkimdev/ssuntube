'use strict'
import express from "express";
import {home} from "./routes/globalRouter";

const app = express()
const PORT = "4000";
app.get("home", home);
const serverHandleListening = () => console.log(`🌊Sever is Listening on port${PORT}!🌊`);
app.listen(PORT, serverHandleListening);