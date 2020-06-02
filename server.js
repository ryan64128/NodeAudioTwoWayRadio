var express = require('express');
var http = require('http');
var nodeMailer = require('nodemailer');

var port = process.env.PORT || 8010;

var app = express()
			.use(express.static(__dirname + '/public'))
			.listen(port);

// http.createServer(app).listen(8080);
console.log("server.js running on port " + port);

var transporter = nodeMailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'ryan64128@gmail.com',
		pass: 'Ry64An128'
	}
});

var mailOptions = {
	from: 'ryan64128@gmail.com',
	to: 'fatima64128@yahoo.com',
	subject: 'Sending e-mail using Node.js',
	text: 'Hello World, nodemailer!'
};

transporter.sendMail(mailOptions, function(error, info){
	if (error){
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
	}
});