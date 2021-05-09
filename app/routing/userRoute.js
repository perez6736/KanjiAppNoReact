const user = require("../controller/authController");

// frontend calls are coming here. 
module.exports = function(app) {

    // login route 
    app.post("/login/login", function(req, res) {
        user.login(req, res);
    });

    // register route 
    app.post("/login/register", function(req, res) {
        user.registerUser(req, res);
    });

    // logout route 
    app.post("/login/logout", function(req, res) {
        user.logout(req, res);
    });

};