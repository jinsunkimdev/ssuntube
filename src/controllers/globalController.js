'use strict'
import User from "../models/User";
export const home = async(req, res) => {
	try{
	const users = await User.find({});
	res.render('home', { pageTitle: "Home", users});
	}catch(error){
		console.log("🏡Error from home" + error);
	} // find users collections all info
}// home