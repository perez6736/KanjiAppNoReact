// this will need to change when i push it to heroku. 
// make this file exist on laptop. 
var WKkeys = require('../../configkeys/apiKeys.js');
const request = require('request');
var key = WKkeys.apiKeys.waniKani;

module.exports = function(app) {
    app.post("/api/routes", function(req, res){
        testing();
        res.json("test");
        
    });
}

const options = {
    url: 'https://api.wanikani.com/v2/subjects',
    method: 'GET',
    headers: {
        Authorization: 'Bearer ' + key
    }
};

function testing(){
    request(options, function(error, response, body) {
        if (!error) {
            let json = JSON.parse(body)
            console.log(response);
            console.log(body);
        }
        else{
            console.log("there was an error. ");
        }
    });
}
