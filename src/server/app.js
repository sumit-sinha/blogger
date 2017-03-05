"use strict"

const express = require("express"),
	app = express(),
	logger = require("./logger"),
	bodyParser = require("body-parser"),
	fs = require("fs"),
	path = require("path"),
	session = require("express-session"),
	MongoClient = require('mongodb').MongoClient,
	MongoStore = require("connect-mongo")(session),
	PropertiesReader = require("properties-reader"),
	applicationUtil = require("./src/common/utility/ApplicationUtility")({
		languageProperty: PropertiesReader(path.join(__dirname + "/properties/language.properties")),
		applicationPropery: PropertiesReader(path.join(__dirname + "/properties/application.properties"))
	});

let labels = applicationUtil.loadLabels();
let settings = applicationUtil.loadApplicationProperty();

app.use(logger);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + "/../../static")));
app.use(session({
	secret: settings.session_secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: settings.cookie.secure === "true",
		httpOnly: settings.cookie.httpOnly === "true",
		maxAge: parseInt(settings.cookie.maxAge)
	},
	store: new MongoStore({
		url: settings.database.session_store_connection_string
	})
}));

MongoClient.connect(settings.database.application_data_connection_string, function (err, db) {
	
	if (err) { throw err }

	app.set('view engine', 'pug');
	app.listen(settings.server_port, () => {
		console.log("running server on port " + settings.server_port);
		console.log("access content using URL: http://127.0.0.1:" + settings.server_port + "/");
	});

	let config = {
		app: app,
		database: db,
		applicationUtil: applicationUtil
	};

	require("./src/flows/index/IndexDisplay")(config);
	require("./src/flows/profile/Login")(config);
	require("./src/flows/blog/BlogEdit")(config);
	require("./src/flows/blog/BlogDisplay")(config);
});
