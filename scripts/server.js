var express = require('express');
var path = require('path');
var chalk = require('chalk');

// Server Settings
var app = express();
var rootpath = path.normalize(__dirname + '/../');
var port = 8000;

app.use(express.static(rootpath + '/src'));

// Run server
app.listen(port, function () {
  console.log(chalk.magenta('server running on http://localhost:' + chalk.underline(port)));
});

// Routes
app.get('/', function (req, res) {
    res.sendFile(rootpath + '/src/index.html');
}); 