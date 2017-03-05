"use strict"

const express = require("express"),
	app = express(),
	logger = require("./logger"),
	bodyParser = require("body-parser"),
	fs = require("fs"),
	path = require("path"),
	session = require("express-session"),
	PropertiesReader = require("properties-reader"),
	applicationUtil = require("./src/common/utility/ApplicationUtility")({
		languageProperty: PropertiesReader(path.join(__dirname + "/properties/language.properties")),
		applicationPropery: PropertiesReader(path.join(__dirname + "/properties/application.properties"))
	});

applicationUtil.loadLabels();
applicationUtil.loadApplicationProperty();

let settings = applicationUtil.getSettings();
let config = {
	app: app, 
	applicationUtil: applicationUtil
};

app.use(logger);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + "/../../static")));
app.use(session({
	secret: settings.session_secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		/*cookie: secure, //enable this is production*/
		httpOnly: true,
		maxAge: 600000
	}
}));

app.set('view engine', 'pug');
app.listen(settings.server_port, () => {
	console.log("running server on port " + settings.server_port);
	console.log("access content using URL: http://127.0.0.1:" + settings.server_port + "/");
});

require("./src/flows/index/IndexDisplay")(config);
require("./src/flows/profile/Login")(config);
require("./src/flows/blog/BlogEdit")(config);
require("./src/flows/blog/BlogDisplay")(config);
