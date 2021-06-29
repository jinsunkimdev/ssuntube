'use strict';
import app from "./server"
import "./db";
import "./models/User";
//port 
const PORT = process.env.SERVER_PORT;
//connect server
const serverListening = () => console.log(`🌊Sever is Listening on port${PORT}!🌊`);
app.listen(PORT, serverListening);
