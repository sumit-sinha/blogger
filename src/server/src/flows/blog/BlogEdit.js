"use strict";

/**
 * new module to allow users to update or save new blog
 * @param config {Object}
 */
module.exports = function(config) {

	let app = config.app,
		database = config.database,
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

	/**
	 * function to check if the passed title already exists in DB
	 * @param title {String}
	 * @return {Boolean}
	 */
	let isExistingTitle = function(title) {
		return true;
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

			let labels = applicationUtil.getLabels();

			if (!isLoggedIn(request)) {
				response.send({ 
					success: false,
					errors: [labels.system.tx_unauthorized_access]
				});

				return;
			}

			let errors = [];
			if (request.body.type !== 0 && request.body.type !== 1) {
				errors.push(labels.system.tx_save_wrong_type_error);
			}

			if (request.body.content == null || request.body.content.trim() === "") {
				errors.push(labels.system.tx_save_empty_content_error);
			}

			if (request.body.title == null || request.body.title.trim() === "") {
				errors.push(labels.system.tx_save_empty_title_error);
			} else if (isExistingTitle(request.body.title)) {
				errors.push(labels.system.tx_save_existing_title_error);
			}

			if (errors.length > 0) {
				response.send({ 
					success: false,
					errors: errors
				});

				return;
			}

			response.send({ success: true });
		});
}