'use strict'
import mongoose from "mongoose";
import { Schema } from "mongoose";

const videoSchema = new Schema({
	videoTitle:{type: String, required: true, min: 5, max: 20}, 
	//writer:{type: mongoose.SchemaTypes.ObjectId, ref: 'users'},
	fileUrl:{type: String, required: true},
	description:{type: String, required: true, min: 5, max: 350},
	createdAt:{type: Date, default: Date.now},
	views:{type: Number, default: 0},
})

const Video = mongoose.model('videos', videoSchema);
export default Video;