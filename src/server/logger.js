module.exports = function(request, response, next) {

	var start = +new Date(), 
		url = request.url, 
		method = request.method,
		stream = process.stdout;

	response.on("finish", function() {
		stream.write(url + "[" + method + "]: " + (+new Date() - start) + "ms\n");
	});

	next();
}