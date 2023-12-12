//add dev env and imports
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('./config/express');

//host the app on the port 8080
var app = express();
app.listen(8080);
module.exports = app;

console.log('Server running at http://localhost:8080/');