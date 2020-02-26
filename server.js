var express = require('express');
var bodyParser = require("body-parser");

var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// need this to use the js file and css file for the html pages. 
app.use(express.static(__dirname + '/app/publicfacing'));

//Router
require("./app/routing/waniAPI")(app);
require("./app/routing/htmlRoute")(app);
var routes = require("./app/Controller/KanjiController.js");

// Listner 

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });