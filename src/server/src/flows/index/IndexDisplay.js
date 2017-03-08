"use strict";

/**
 * a new module to display index page
 * @param config {Object}
 */
module.exports = function(config) {

	let app = config.app,
		database = config.database,
		applicationUtil = config.applicationUtil;
	
	app.route("/")
		.get((request, response) => {

			applicationUtil.processData(request, database, "index", {}).then((data) => {
				response.render("index", data);
			}).catch((data) => {
				response.render("index", data);
			});
		});
}