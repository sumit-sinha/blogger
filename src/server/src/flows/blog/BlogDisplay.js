"use strict";

/**
 * a new module for display of blog content
 * @param config
 */
module.exports = function(config) {

	let app = config.app, 
		applicationUtil = config.applicationUtil;

	app.route("/:blog")
		.get((request, response) => {
			response.render("index", applicationUtil.processData({
					blogList: [],
				}, "index"));
		});
}