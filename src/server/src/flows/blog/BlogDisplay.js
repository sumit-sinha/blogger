"use strict";

/**
 * a new module for display of blog content
 * @param config
 */
module.exports = function(config) {

	let app = config.app,
		database = config.database,
		applicationUtil = config.applicationUtil,
		settings = applicationUtil.getSettings();

	app.route("/:blog")
		.get((request, response) => {

			let title = request.params.blog;
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

					let pageData = {
						author: {
							name: settings.profile.name,
							link: "/"
						},
						type: blogDetail.type,
						text: blog.content,
						title: blogDetail.heading,
						postDate: blogDetail.postDate
					};

					applicationUtil.processData(request, database, "blog", pageData).then((data) => {
						response.render("index", data);
					}).catch((data) => {
						response.render("index", data);
					});
				});
			});
		});
}