"use strict";

/**
 * a new module to display index page
 * @param config {Object}
 */
module.exports = function(config) {

	let app = config.app, 
		applicationUtil = config.applicationUtil;
	
	app.route("/")
		.get((request, response) => {
			response.render("index", applicationUtil.processData({
				blogList: [],
			}, "index"));
		});
}