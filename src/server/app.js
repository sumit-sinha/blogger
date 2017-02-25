"use strict"

const express = require("express"),
	app = express(),
	logger = require("./logger"),
	bodyParser = require("body-parser"),
	path = require("path"),
	PropertiesReader = require("properties-reader"),
	applicationUtil = require("./src/common/utility/ApplicationUtility")({
		languageProperty: PropertiesReader(path.join(__dirname + "/properties/language.properties")),
		applicationPropery: PropertiesReader(path.join(__dirname + "/properties/application.properties"))
	});

app.use(logger);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + "/../../static")));

applicationUtil.loadLabels();
applicationUtil.loadApplicationProperty();

app.set('view engine', 'pug');
app.listen(3000, () => {
	console.log("running server on port 3000");
});

let config = {
	app: app, 
	applicationUtil: applicationUtil
};

require("./src/flows/index/IndexDisplay")(config);
require("./src/flows/profile/Login")(config);
require("./src/flows/blog/BlogEdit")(config);
require("./src/flows/blog/BlogDisplay")(config);
