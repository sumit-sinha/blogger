"use strict";

/**
 * a new module to display index page
 * @param config {Object}
 */
module.exports = function(config) {

	let app = config.app,
		database = config.database,
		applicationUtil = config.applicationUtil;
	
	app.route("/")
		.get((request, response) => {

			database.collection("blog_details").find({}).toArray(function (err, blogList) {
				
				if (err) { throw err; }
				
				response.render("index", applicationUtil.processData({
					blogList: blogList,
				}, "index", request));
			});
		});
}