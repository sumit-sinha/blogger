"use strict";

/**
 * module to manage common tasks for application
 * @param args {Object}
 */
module.exports = function(args) {

	let settings = {},
		labels = {public: {}, system: {}},
		languageProperty = args.languageProperty, 
		applicationPropery = args.applicationPropery,

	/**
	 * function to split key based on "."
	 * @param key {String}
	 * @return {Array}
	 */
	getKeyArray = function(key) {
		let keys = null;
		if (key.indexOf(".") === -1) {
			keys = ["", key];
		} else {
			keys = key.split(".");
		}

		return keys;
	},

	/**
	 * function to parse data to to get a list of profiles
	 * @param data {String}
	 * @return {Array}
	 */
	getProfileLinks = function(data) {

		let list = [];
		let values = data.split("|");

		for (let i = 0, length = values.length; i < length; i++) {
			let link = values[i].split("---");
			list.push({
				type: link[0],
				url: link[1]
			});
		}

		return list;
	},

	/**
	 * function to fetch content from database
	 * @param database {Object} object to connect to database
	 * @return {Promise}
	 */
	getRecentBlogs = function(database) {
		
		let promise = new Promise((resolve, reject) => {
			database.collection("blog_details")
				.find({$query: {type: "0"}, $orderby: { postDate : 1 }})
				.toArray((error, result) => {

				if (error) {
					reject(error);
				}

				let blogs = [];
				for (let i = 0, length = result.length; i < length; i++) {
					let blog = result[i],
						lastUpdate = new Date(blog.lastUpdated),
						dateArray = [lastUpdate.getFullYear(), lastUpdate.getMonth(), 
										lastUpdate.getDate(), lastUpdate.getHours(),
										lastUpdate.getMinutes(), lastUpdate.getSeconds(),
										lastUpdate.getMilliseconds()];

					blogs.push({
						title: blog._id,
						heading: blog.heading,
						author: settings.profile.name,
						jsDate: dateArray
					});
				}

				resolve(blogs);
			});
		});

		return promise;
	};

	return {
		/**
		 * function to create a common structure for data to be passed to UI
		 * @param request {Object}
		 * @param database {Object}
		 * @param page {String}
		 * @param pageData {Object}
		 * @return {Promise}
		 */
		processData: function(request, database, page, pageData) {
			let object = {data: {}},
				loggedIn = request.session.logged_in;

			object.data[page] = pageData;
			object.data.labels = labels.public;

			object.data.global = {
				logged_in: loggedIn,
				profile: settings.profile,
				header: { title: settings.application_title }
			};

			let promise = new Promise((resolve, reject) => {
				let recentBlogsPromise = getRecentBlogs(database);
				recentBlogsPromise.then((blogs) => {
					object.data.global.blogs = blogs;
					resolve(object);
				}).catch((error) => {
					reject(object);
				});
			});

			return promise;
		},
		/**
		 * function to get all the details realted to blog
		 * @param database {Object} connector to database
		 * @param title {String} title of blog
		 * @return {Promise}
		 */
		getBlogInformation: function(database, title) {

			if (database == null || title == null) {
				return null;
			}

			let promise = new Promise((resolve, reject) => {
				database.collection("blog_details").findOne({_id: title}, (err, blogDetail) => {

					if (err || blogDetail == null) {
						reject({text: "Unable to find collection", code: -1});
						return;
					}

					database.collection("blogs").findOne({_id: title}, (error, blog) => {

						if (error || blog == null) {
							reject({text: "Unable to find collection", code: -1});
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

						resolve(pageData);
					});
				});
			});

			return promise;
		},
		/**
		 * function to read all the labels from properties
		 * it is called before server start
		 */
		loadLabels: function() {
			languageProperty.each((key, value) => {
			
				let keys = getKeyArray(key);
				if (keys[0] === "public") {
					labels.public[keys[1]] = value;
				} else if (keys[0] === "system") {
					labels.system[keys[1]] = value;
				} else {
					labels[keys[1]] = value;
				}
			});

			return labels;
		},
		/**
		 * function to read all the settings from properties
		 * it is called before server start
		 */
		loadApplicationProperty: function() {
			applicationPropery.each((key, value) => {

				let keys = getKeyArray(key);
				if (keys[0] === "") {
					settings[keys[1]] = value;
				} else {

					if (keys[0] === "profile" && keys[1] === "links") {
						value = getProfileLinks(value);
					}

					if (settings[keys[0]] == null) {
						settings[keys[0]] = {};
					}

					settings[keys[0]][keys[1]] = value;
				}
			});

			return settings;
		},

		/**
		 * get all the labels
		 * @return {Object}
		 */
		getLabels: function() {
			return labels;
		},

		/**
		 * get all the settings
		 * @return {Object}
		 */
		getSettings: function() {
			return settings;
		}
	}
};