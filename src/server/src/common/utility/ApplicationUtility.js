"use strict";

/**
 * module to manage common tasks for application
 * @param args {Object}
 */
module.exports = function(args) {

	let labels = {public: {}, system: {}}, 
		settings = {profile: {}},
		languageProperty = args.languageProperty, 
		applicationPropery = args.applicationPropery;

	/**
	 * function to split key based on "."
	 * @param key {String}
	 * @return {Array}
	 */
	var getKeyArray = function(key) {
		let keys = null;
		if (key.indexOf(".") === -1) {
			keys = ["", key];
		} else {
			keys = key.split(".");
		}

		return keys;
	};

	return {
		/**
		 * function to create a common structure for data to be passed to UI
		 * @param data {Object}
		 * @param page {String}
		 * @param request {Object}
		 * @return {Object}
		 */
		processData: function(data, page, request) {
			let object = {data: {}};
			object.data[page] = data;
			
			object.data.labels = labels.public;
			object.data.global = {
				profile: settings.profile,
				logged_in: request.session.logged_in,
				header: { title: settings.application_title }
			}

			return object;
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
		},
		/**
		 * function to read all the settings from properties
		 * it is called before server start
		 */
		loadApplicationProperty: function() {
			applicationPropery.each((key, value) => {

				let keys = getKeyArray(key);
				if (key.indexOf(".") === -1) {
					keys = ["", key];
				} else {
					keys = key.split(".");
				}

				if (keys[0] === "profile") {
					if (keys[1] === "links") {

						let values = value.split("|");

						value = [];
						for (let i = 0, length = values.length; i < length; i++) {
							let link = values[i].split("---");
							value.push({
								type: link[0],
								url: link[1]
							});
						}
					}

					settings.profile[keys[1]] = value;
				} else {
					settings[keys[1]] = value;
				}
			});
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