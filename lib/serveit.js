#!/usr/bin/env node

var http = require("http");
var fs = require("fs");
var path = require("path");
var port = process.argv[2] || 1337;

var mimetypes = {
	"html": "text/html",
	"css": "text/css",
	"js": "text/javascript",
	"jpg": "text/jpeg",
	"jpeg": "text/jpeg",
	"png": "text/png"
};

var server = http.createServer(function(req, res) {
	if (req.url === "/") {
		res.writeHead(302, {"Location": "index.html"});
		res.end();
	} else {
		var file = path.join(process.cwd(), req.url);
		fs.exists(file, function(exists) {
			if (exists) {
				var ext = path.extname(file).split(".")[1];
  				res.writeHead(200, {'Content-Type': mimetypes[ext]});
  				fs.createReadStream(file).pipe(res);
  			} else {
  				res.writeHead(404, {'Content-Type': 'text/plain'});
  				res.write("404 Not Found - Sorry!");
  				res.end();
  				return;
  			}
		});
	}
});

server.listen(port, "localhost", function() {
	console.log("Server listening at: http://localhost:%s", port);
});