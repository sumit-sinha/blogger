var express = require("express"),
	logger = require("./logger"),
	path = require("path");

var app = express();

app.use(logger);
app.use(express.static(path.join(__dirname + "/../../static")));

app.set('view engine', 'pug');

app.route("/")
	.get(function(request, response) {
		response.render("index", {title: 'Hey', message: 'Hello there!'});
	});

app.route("/:blog")
	.get(function(request, response) {
		response.render("index", {title: 'Hey', message: 'Hello there!'});
	});

app.listen(3000, function() {
	console.log(path.join(__dirname + "/../../static"));
	console.log("running server on port 3000");
});