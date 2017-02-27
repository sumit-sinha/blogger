"use strict";

/**
 * a new module to manage login flow
 * @param config {Object}
 */
module.exports = function(config) {

	let app = config.app,
		applicationUtil = config.applicationUtil;

	const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	app.route("/profile/login")
		.get((request, response) => {
			response.render("index", applicationUtil.processData({
					blogList: [],
				}, "index", request));
		})
		.post((request, response) => {

			let labels = applicationUtil.getLabels(), 
				profile = applicationUtil.getSettings().profile,
				email = request.body.email,
				password = request.body.password;

			if (emailRegex.test(email) 
				&& password != null && password.trim() !== ""
				&& (profile.user_id === email && profile.password === password)) {
				
				let filteredProfile = {
					name: profile.name,
					user: profile.user_id,
					description: profile.description
				};

				request.session.profile = filteredProfile;
				response.send(filteredProfile);

				return;
			}

			response.send({
				error: labels.system.tx_login_error
			});
		});
}