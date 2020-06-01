var express = require('express');
var http = require('http');

var port = process.env.PORT || 8010;

var app = express()
			.use(express.static(__dirname + '/public'))
			.listen(port);

// http.createServer(app).listen(8080);
console.log("server.js running on port " + port);