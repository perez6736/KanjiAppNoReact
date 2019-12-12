import express from "express";
import { urlencoded, json } from "body-parser";

var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(urlencoded({ extended: true }));
app.use(json());

//Router
//set it up like this later
var routes = require("./routing/waniAPI")(app);
// require("./app/routing/htmlRoutes")(app);

// Listner 
app.use("/", routes);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });