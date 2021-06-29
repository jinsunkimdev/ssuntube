'use strict';
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
	userName: { type: String, required: true, min: 3, max: 20 },
	userId: { type: String, required: true, min: 5, max: 15 },
	password: { type: String, required: true, min: 8, max: 20 },
	createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('users', userSchema);
export default User;