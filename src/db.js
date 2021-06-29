'use strict';
import mongoose from "mongoose";
// Functions
const handleErrorMessage = (error) => {
	console.log("❌ db connection ERROR ❌")
};
const handleOpenMessage = (open) => {
	console.log("👏 DB is Listening! 👏")
};

// connect mongodb
mongoose.connect(process.env.MONGODB_URL,{ 
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', handleErrorMessage);
db.once('open', handleOpenMessage);
export default db;
