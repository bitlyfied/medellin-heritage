var http    = require('http');
var express = require('express');
var config  = require('./config');

var app     = express();
var server  = http.createServer(app);

console.log('Server running');

app.use(express.static(config.staticUrl));
app.use(express.static(config.distFolder));

app.get('/config.js', function(req, res) {
  var jsConfig = { gaKey: process.env.GA_KEY || 'kitty' };
  res.send('var config = ' + JSON.stringify(jsConfig));
});

server.listen(process.env.PORT || config.listenPort);