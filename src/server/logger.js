"use strict";

module.exports = function(request, response, next) {

	var start = +new Date(), 
		url = request.url, 
		method = request.method,
		stream = process.stdout;

	response.on("finish", function() {
		let message = url + "[" + method + "]: " + (+new Date() - start) + "ms;";
		if (request.session) {
			message += request.session.id;
		}

		message += "\n";
		stream.write(message);
	});

	next();
}