"use strict"

const express = require("express"),
	app = express(),
	logger = require("./logger"),
	bodyParser = require("body-parser"),
	path = require("path"),
	PropertiesReader = require("properties-reader");

var applicationPropery = PropertiesReader(path.join(__dirname + "/properties/application.properties")),
	languageProperty = PropertiesReader(path.join(__dirname + "/properties/language.properties"));

app.use(logger);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + "/../../static")));

app.set('view engine', 'pug');
app.listen(3000, () => {
	console.log("running server on port 3000");
});

/**
 * function to form a generic data structure for all page data
 * @param data {Object}
 * @param page {String}
 * @return {Object}
 */
var processData = function(data, page) {
	
	let object = {data: {}};
	object.data[page] = data;
	
	object.data.labels = {};
	languageProperty.each((key, value) => {
		object.data.labels[key] = value;
	});

	object.data.global = {
		header: { title: applicationPropery.get("application_title") }
	}

	return object;
}

app.route("/")
	.get((request, response) => {
		db.collection("blogs").find().toArray((err, results) => {
			response.render("index", processData({
				blogList: results,
			}, "index"));
		});
	});

app.route("/:blog")
	.get((request, response) => {
		response.render("index", processData({
				blogList: [],
			}, "index"));
	});

app.route("/:blog/edit")
	.get((request, response) => {
		response.render("index", processData({
				blogList: [],
			}, "index"));
	});

app.route("/profile/login")
	.get((request, response) => {
		response.render("index", processData({
				blogList: [],
			}, "index"));
	})
	.post((request, response) => {
		response.send({
			"param1": request.body.param1,
			"param2": request.body.param2
		});
	});

