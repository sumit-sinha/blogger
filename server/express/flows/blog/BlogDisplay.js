"use strict";

/**
 * a new module for display of blog content
 * @param config
 */
module.exports = function(config) {

	let app = config.app,
		database = config.database,
		applicationUtil = config.applicationUtil,
		settings = applicationUtil.getSettings(),

	/**
	 * function called when we need to send response
	 * @param response {Object}
	 * @param data {Object}
	 * @param isJsonRequest {Boolean}
	 */
	sendResponse = function(response, data, isJsonRequest) {
		if (isJsonRequest) {
			response.send(data);
		} else {
			response.render("index", data);
		}
	};

	app.route("/:blog")
		.get((request, response) => {

			let title = request.params.blog,
				isJsonRequest = request.query.is_json === "true";

			applicationUtil.getBlogInformation(database, title).then((responseData) => {
				applicationUtil.processData(request, database, "blog", responseData).then((data) => {
					sendResponse(response, data, isJsonRequest);
				}).catch((data) => {
					sendResponse(response, data, isJsonRequest);
				});
			}).catch((error) => {
				sendResponse(response, error, isJsonRequest);
			});
		});
}