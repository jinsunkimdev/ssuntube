'use strict';
import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URL,{ 
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', function(){console.log("db connection error")});
db.once('open', () => {console.log("db connect complete!")});
export default db;
