var http    = require('http');
var express = require('express');
var config  = require('./config');

var app     = express();
var server  = http.createServer(app);

app.use(express.static(config.staticUrl));
console.log('Server running');

app.all('/*', function(req, res) {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');

  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: config.distFolder });

});

server.listen(config.listenPort);