var path = require("path");

module.exports = function(app) {

    //app.use(express.static(__dirname + '../publicfacing/assets'));
  
    // home route 
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../View/login.html"));
    });

    // login route 
    app.get("/home", function(req, res) {
        // To-Do - redirect if user is not logged in. 
        res.sendFile(path.join(__dirname, "../View/home.html"));
    });

    // login route 
    app.get("/login", function(req, res) {
        res.sendFile(path.join(__dirname, "../View/login.html"));
    });

    // UserRegisterFrom route 
    app.get("/registeruser", function(req, res) {
        res.sendFile(path.join(__dirname, "../View/UserRegisterFrom.html"));
    });

    // catch all sends back to home
    app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../View/login.html"));
    });

};