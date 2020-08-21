var express = require('express');
var bodyParser = require("body-parser");
var session = require('express-session');

var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// this is the sesisons stuff
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// need this to use the js file and css file for the html pages. 
app.use(express.static(__dirname + '/app/View'));

//Router
require("./app/routing/waniAPI")(app);
require("./app/routing/htmlRoute")(app);
require("./app/routing/kanjiRoute")(app);
require("./app/routing/userRoute")(app);

// Listner 

app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
  });