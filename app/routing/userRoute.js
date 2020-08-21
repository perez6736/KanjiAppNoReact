const path = require("path");
const user = require("../Controller/AuthController");

module.exports = function(app) {

    // login route 
    app.post("/login/login", function(req, res) {
        user.login(req, res);
    });

    // register route 
    app.post("/login/register", function(req, res) {
        user.registerUser(req,res);
    });

};