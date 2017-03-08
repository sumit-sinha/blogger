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
			let settings = applicationUtil.getSettings();

			if (!isLoggedIn(request)) {
				response.send({ 
					success: false,
					errors: [labels.system.tx_unauthorized_access]
				});

				return;
			}

			let errors = [],
				currentTime = new Date(),
				profile = settings.profile,
				type = request.body.type,
				content = request.body.content,
				title = request.body.title,
				heading = request.body.heading;

			if (type !== "0" && type !== "1") {
				errors.push(labels.system.tx_save_wrong_type_error);
			}

			if (content == null || content.trim() === "") {
				errors.push(labels.system.tx_save_empty_content_error);
			}

			if (title == null || title.trim() === "") {
				errors.push(labels.system.tx_save_empty_title_error);
			}

			if (heading == null || heading.trim() === "") {
				errors.push(labels.system.tx_save_empty_title_error);
			}

			if (errors.length > 0) {
				response.send({ 
					success: false,
					errors: errors
				});

				return;
			}


			database.collection("blogs").insertOne({
				_id: title,
				heading: heading,
				content: content
			}, (err, result) => {
				
				if (err) {

					let errorMessage = labels.system.tx_save_db_error;
					if (err.code === 11000) {
						errorMessage = labels.system.tx_save_existing_title_error;
					}

					response.send({ 
						success: false,
						errors: [errorMessage]
					});

					return;
				}

				database.collection("blog_details").insertOne({
					_id: title,
					author: profile.user_id,
					postDate: currentTime,
					lastUpdated: currentTime,
				}, (err, result) => {

					if (err) { 
						
						let errorMessage = labels.system.tx_save_db_error;
						if (err.code === 11000) {
							errorMessage = labels.system.tx_save_existing_title_error;
						}

						database.blogs.remove({
							title: title
						});

						response.send({ 
							success: false,
							errors: [errorMessage]
						});

						return; 
					}

					response.send({ success: true });
				});
			});
		});
}