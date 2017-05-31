"use strict"

const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	fs = require("fs"),
	path = require("path"),
	session = require("express-session"),
	MongoClient = require('mongodb').MongoClient,
	MongoStore = require("connect-mongo")(session),
	PropertiesReader = require("properties-reader"),
	applicationUtil = require("./express/common/utility/ApplicationUtility")({
		languageProperty: PropertiesReader(path.join(__dirname + "/properties/language.properties")),
		applicationPropery: PropertiesReader(path.join(__dirname + "/properties/application.properties"))
	});

let labels = applicationUtil.loadLabels();
let settings = applicationUtil.loadApplicationProperty();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname + "/../dist")));
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

	process.on('exit', () => {
		db.close();
	});

	let config = {
		app: app,
		database: db,
		applicationUtil: applicationUtil
	};

	require("./express/flows/index/IndexDisplay")(config);
	require("./express/flows/profile/Login")(config);
	require("./express/flows/blog/BlogEdit")(config);
	require("./express/flows/blog/BlogDisplay")(config);
});
