'use strict';
import app from "./server"
import "./db";
import "dotenv/config";
const PORT = "5000";//port number
//connect server
const serverListening = () => console.log(`🌊Sever is Listening on port${PORT}!🌊`);
app.listen(PORT, serverListening);
