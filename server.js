var express = require('express');
var http = require('http');

var port = process.env.PORT || 3000;

var app = express()
			.use(express.static(__dirname + '/public'))
			.listen(8080);

// http.createServer(app).listen(8080);