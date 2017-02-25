"use strict";

/**
 * new module to allow users to update or save new blog
 * @param config {Object}
 */
module.exports = function(config) {

	let app = config.app, 
		applicationUtil = config.applicationUtil;

	app.route("/:blog/edit")
		.get((request, response) => {
			response.render("index", applicationUtil.processData({
					blogList: [],
				}, "index"));
		});
}