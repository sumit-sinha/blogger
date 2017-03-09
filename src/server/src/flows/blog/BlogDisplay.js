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

			database.collection("blog_details").findOne({_id: title}, (err, blogDetail) => {

				if (err || blogDetail == null) {
					response.redirect("/");
					return;
				}

				database.collection("blogs").findOne({_id: title}, (error, blog) => {

					if (error || blog == null) {
						response.redirect("/");
						return;
					}

					let pageData = {};
					pageData[title] = {
						author: {
							name: settings.profile.name,
							link: "/"
						},
						type: blogDetail.type,
						text: blog.content,
						title: blogDetail.heading,
						postDate: blogDetail.postDate
					}

					let fnName = "render";
					if (isJsonRequest) {
						fnName = "send"
					}

					applicationUtil.processData(request, database, "blog", pageData).then((data) => {
						sendResponse(response, data, isJsonRequest);
					}).catch((data) => {
						sendResponse(response, data, isJsonRequest);
					});
				});
			});
		});
}