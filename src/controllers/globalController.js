'use strict'
export const home = (req, res) => {
	res.render('home', { pageTitle: "Home"});
}// homepage