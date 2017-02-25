"use strict";

/**
 * a new module to manage login flow
 * @param config {Object}
 */
module.exports = function(config) {

	let app = config.app,
		applicationUtil = config.applicationUtil;

	app.route("/profile/login")
		.get((request, response) => {
			response.render("index", applicationUtil.processData({
					blogList: [],
				}, "index"));
		})
		.post((request, response) => {

			let labels = applicationUtil.getLabels(), 
				settings = applicationUtil.getSettings(),

				email = request.body.email,
				password = request.body.password,
				emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (emailRegex.test(email) && password != null && password.trim() !== "") {
				let profile = settings.profile;
				if (profile.user_id === email && profile.password === password) {
					response.send({
						name: profile.name,
						user: profile.user_id,
						description: profile.description
					});

					return;
				}
			}

			response.send({
				error: labels.system.tx_login_error
			});
		});
}