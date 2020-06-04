var express = require('express');
var http = require('http');
var nodeMailer = require('nodemailer');

var port = process.env.PORT || 8010;

var app = express()
			.use(express.static(__dirname + '/public'))
			.use('/mail', function(req, res, next){
				var mailOptions = {
					from: 'ryan64128@gmail.com',
					to: req.query.to,
					subject: 'Two-Way Radio File Download',
					text: 'Thank for trying our app!',
					attachments: [
					{
						filename: req.query.filename || 'helicopter.wav',
						path: './public/' + req.query.filename || './public/helicopter.wav'
					}]
				};
				transporter.sendMail(mailOptions, function(error, info){
					if (error){
						console.log(error);
					} else {
						console.log('File sent via email: ' + info.response);
					}
				});
			})
			.listen(port);

// http.createServer(app).listen(8080);
console.log("server.js is not running on port " + port);

var transporter = nodeMailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'ryan64128@gmail.com',
		pass: 'Ry64An128'
	}
});





