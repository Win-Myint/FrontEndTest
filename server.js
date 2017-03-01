var log 	 = console.log;

// Require express 
var express  = require('express');
var server   = express();

// Assign default port along with static port
var port 	 = process.env.PORT || 3000;
var path 	 = require("path");

// Specify root (/) path and respond file
server.use(express.static('public'));
var callback = function() {log("Listenting at port " + port);}
var get 	 = function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
}

server.get('/', get);

server.listen(port, callback);




