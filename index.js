var express = require('express');
var app = express();

var port = 3456;
var service = "C";
var version = "1.0.0";

app.get('/', function(req, res) {
    console.log("Someone is requesting access to version: " + version + " of service " + service);
    res.json({
    	"service": service,
    	"version": version
    });
});

app.listen(port, function() {
       	console.log("Server listening on port " + port);
});
