// this will need to change when i push it to heroku. 
// var WKapiKey = require('../../configkeys/congif.js');

module.exports = function(app) {
    app.post("/api/routes", function(req, res){
        console.log(req);
        res.json("test");
        
    });
}