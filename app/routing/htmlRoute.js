var path = require("path");

module.exports = function(app) {

    //app.use(express.static(__dirname + '../publicfacing/assets'));
  
    // home route 
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../view/home.html"));
        // if (req.session.loggedin === true){
        //     res.sendFile(path.join(__dirname, "../view/home.html"));
        // }else {
        //     res.sendFile(path.join(__dirname, "../view/login.html"));
        // }
    });

    // login route 
    app.get("/home", function(req, res) {
        res.sendFile(path.join(__dirname, "../view/home.html"));
        // if(req.session.loggedin === true){
        //     res.sendFile(path.join(__dirname, "../view/home.html"));
        // }else{
        //     res.sendFile(path.join(__dirname, "../view/login.html"));
        // }

    });

    // login route 
    app.get("/login", function(req, res) {
        //console.log(req.session.loggedin)
        // check if user is logged in. - if yes go to home page else go to login page. 
        if (req.session.loggedin === true){
            res.sendFile(path.join(__dirname, "../view/home.html"));
        }else {
            res.sendFile(path.join(__dirname, "../view/login.html"));
        }

    });

    // UserRegisterFrom route 
    app.get("/registeruser", function(req, res) {
        res.sendFile(path.join(__dirname, "../view/userRegisterFrom.html"));
    });

    // catch all sends back to home
    app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../view/login.html"));
    });

};