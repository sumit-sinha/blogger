"use strict";

/**
 * new module to allow users to update or save new blog
 * @param config {Object}
 */
module.exports = function(config) {

	let app = config.app,
		database = config.database,
		applicationUtil = config.applicationUtil,

	/**
	 * function to check if user is logged in
	 * @param request
	 */
	isLoggedIn = function(request) {
		return request.session.logged_in;
	},

	/**
	 * function to redirect to login page
	 * @param response
	 */
	redirectToLoginPage = function(response) {
		response.redirect("/profile/login");
	},

	/**
	 * function to update blog information in database
	 * @param response {Object}
	 * @param database {Object}
	 * @param labels {Object}
	 * @param args {Object}
	 */
	updateBlogInformation = function(response, database, labels, args) {
		database.collection("blogs").update({_id: args.title}, {content: args.content}, (err, result) => {

			if (err) {
				response.send({ 
					success: false,
					errors: [labels.system.tx_save_db_error]
				});

				return;
			}

			database.collection("blog_details").update({_id: args.title}, {
				type: args.type,
				heading: args.heading,
				lastUpdated: args.currentTime
			}, (err, result) => {
				
				if (err) { 
					response.send({ 
						success: false,
						errors: [labels.system.tx_save_db_error]
					});

					return;
				}

				response.send({ success: true });
			});
		});
	},

	/**
	 * function to save blog information in database
	 * @param response {Object}
	 * @param database {Object}
	 * @param labels {Object}
	 * @param args {Object}
	 */
	saveBlogInformation = function(response, database, labels, args) {
		database.collection("blogs").insertOne({
			_id: args.title,
			content: args.content
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
				_id: args.title,
				type: args.type,
				heading: args.heading,
				author: args.userId,
				postDate: args.currentTime,
				lastUpdated: args.currentTime
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
	},

	/**
	 * function called to save or update the blog information
	 * @param request {Object}
	 * @param response {Object}
	 * @param isUpdate {Boolean}
	 */
	saveOrUpdateBlog = function(request, response, isUpdate) {
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

		if (isUpdate) {
			updateBlogInformation(response, database, labels, {
				title: title,
				currentTime: currentTime,
				type: type,
				content: content,
				heading: heading
			});
		} else {
			saveBlogInformation(response, database, labels, {
				title: title,
				currentTime: currentTime,
				type: type,
				content: content,
				heading: heading,
				userId: profile.user_id
			});
		}
	};

	app.route("/:blog/edit")
		.get((request, response) => {

			if (!isLoggedIn(request)) {
				redirectToLoginPage(response);
				return;
			}

			let title = request.params.blog;
			applicationUtil.getBlogInformation(database, title).then((responseData) => {
				applicationUtil.processData(request, database, "blog", responseData).then((data) => {
					response.render("index", data);
				}).catch((data) => {
					response.render("index", data);
				});
			}).catch((error) => {
				response.render("index", error);
			});
		}).post((request, response) => {
			saveOrUpdateBlog(request, response, true);
		});

	app.route("/new/blog")
		.get((request, response) => {

			if (!isLoggedIn(request)) {
				redirectToLoginPage(response);
				return;
			}

			applicationUtil.processData(request, database, "edit", {}).then((data) => {
				response.render("index", data);
			}).catch((data) => {
				response.render("index", data);
			});
		})
		.post((request, response) => {
			saveOrUpdateBlog(request, response, false);
		});
}