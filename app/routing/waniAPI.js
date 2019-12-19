// this will need to change when i push it to heroku. 
var WKkeys = require('../../configkeys/apiKeys.js');
const request = require('request');
var key = WKkeys.apiKeys.waniKani;

module.exports = function(app) {
    app.post("/api/routes", function(req, res){
        // idk what im doing - // function gets kanji and sends back results to UI
        getKanji(function (body){
            res.json(body); 
        })
    });
}

// stuff for wani kani api 
const options = {
    url: 'https://api.wanikani.com/v2/subjects?type=kanji',
    method: 'GET',
    headers: {
        Authorization: 'Bearer ' + key
    }
};

function getKanji(callback){
    request(options, function(error, response, body) {
        if (!error) {
            let json = JSON.parse(body)
            callback(body); //send response through call back
        }
        else{
            var errmsg = "error"
            console.log("there was an error. ");
            return errmsg;
        }
    });
}
