require('./api/data/db.js');
var express = require('express');
var routes = require('./api/routes');
var bodyParser = require('body-parser');

var app = express();

app.set('port', 3000);
app.use(express.static('./public'));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
});
