'use strict';
import app from "./server"
import "./db";
import "./models/User";
import "./models/Video";
//port 
const PORT = process.env.SERVER_PORT;
//connect server
const serverListening = () => console.log(`๐Sever is Listening on port${PORT}!๐`);
app.listen(PORT, serverListening);
