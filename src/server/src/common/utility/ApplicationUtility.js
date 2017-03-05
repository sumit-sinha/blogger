"use strict";

/**
 * module to manage common tasks for application
 * @param args {Object}
 */
module.exports = function(args) {

	let labels = {public: {}, system: {}}, 
		settings = {},
		languageProperty = args.languageProperty, 
		applicationPropery = args.applicationPropery;

	/**
	 * function to split key based on "."
	 * @param key {String}
	 * @return {Array}
	 */
	let getKeyArray = function(key) {
		let keys = null;
		if (key.indexOf(".") === -1) {
			keys = ["", key];
		} else {
			keys = key.split(".");
		}

		return keys;
	};

	/**
	 * function to parse data to to get a list of profiles
	 * @param data {String}
	 * @return {Array}
	 */
	let getProfileLinks = function(data) {

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
	}

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