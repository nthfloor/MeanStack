// set up ====================================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var database = require('./config/database.js')
var port = process.env.PORT || 8080;

// Connect to DB =============================
mongoose.connection.on('open', function (ref) {
  console.log('Success: Connected to mongo server...');
});
mongoose.connection.on('error', function (err) {
  console.log('Error: Could not connect to mongo server!');
  console.log(err);
});
mongoose.connect(database.url);

//app config settings ========================
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes ====================================
require('./app/routes.js')(app);

// listen (start app with node server.js======
app.listen(port);
console.log("App listening on port " + port + "...");
