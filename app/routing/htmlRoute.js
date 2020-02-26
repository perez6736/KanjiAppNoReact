var path = require("path");

module.exports = function(app) {

    //app.use(express.static(__dirname + '../publicfacing/assets'));
  
    // home route 
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../View/home.html"));
    });

    // catch all sends back to home
    app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../View/home.html"));
    });

};