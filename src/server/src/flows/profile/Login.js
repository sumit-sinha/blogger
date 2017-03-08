"use strict";

/**
 * a new module to manage login flow
 * @param config {Object}
 */
module.exports = function(config) {

	let app = config.app,
		database = config.database,
		applicationUtil = config.applicationUtil;

	const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	app.route("/profile/login")
		.get((request, response) => {

			applicationUtil.processData(request, database, "login", {}).then((data) => {
				response.render("index", data);
			}).catch((data) => {
				response.render("index", data);
			});
		})
		.post((request, response) => {

			let labels = applicationUtil.getLabels(), 
				profile = applicationUtil.getSettings().profile,
				email = request.body.email,
				password = request.body.password;

			if (emailRegex.test(email) 
				&& password != null && password.trim() !== ""
				&& (profile.user_id === email && profile.password === password)) {

				request.session.logged_in = true;
				response.send({
					logged_in: true
				});

				return;
			}

			response.send({
				error: labels.system.tx_login_error
			});
		});
}