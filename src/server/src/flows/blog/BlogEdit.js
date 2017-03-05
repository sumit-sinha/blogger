"use strict";

/**
 * new module to allow users to update or save new blog
 * @param config {Object}
 */
module.exports = function(config) {

	let app = config.app, 
		applicationUtil = config.applicationUtil;

	/**
	 * function to check if user is logged in
	 * @param request
	 */
	let isLoggedIn = function(request) {
		return request.session.logged_in;
	};

	/**
	 * function to redirect to login page
	 * @param response
	 */
	let redirectToLoginPage = function(response) {
		response.redirect("/profile/login");
	};

	app.route("/:blog/edit")
		.get((request, response) => {

			if (!isLoggedIn(request)) {
				redirectToLoginPage(response);
				return;
			}

			response.render("index", applicationUtil.processData({
					blogList: [],
				}, "index", request));
		});

	app.route("/new/blog")
		.get((request, response) => {

			if (!isLoggedIn(request)) {
				redirectToLoginPage(response);
				return;
			}

			response.render("index", applicationUtil.processData({
					blogList: [],
				}, "index", request));
		})
		.post((request, response) => {
			response.send({ called: true });
		});
}