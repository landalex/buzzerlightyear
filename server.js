var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080);

// var Firebase = require("firebase");
// var ref = new Firebase("https://buzzlightyear.firebaseio.com/");
