// this will need to change when i push it to heroku. 
var WKkeys = require('../../configkeys/apiKeys.js');
const request = require('request');
var key = WKkeys.apiKeys.waniKani;


//
//https://kanjiapi.dev/kanji/[kanji]
//

// =====================================================
// stuff for routes - backend <==> frontend
// =====================================================
module.exports = function(app) {
    app.get("/api/kanji", function(req, res){
        // idk what im doing - 
        // function gets kanji and sends back results to UI
        let encodedKanjiParam = encodeURIComponent(req.query.kanji);
        // pass kanjiparam to 3rd party API and respond with data. 
        getKanji({url: 'https://kanjiapi.dev/v1/kanji/' + encodedKanjiParam, method: 'GET'}, function(body){
            res.json(body);
        });
    });
}
// new API 
// I have to encode the kanji for URLs 
// const getKanjiInfo = {
//     url: 'https://kanjiapi.dev/v1/kanji/' + param,
//     method: 'GET'
// };

//new kanji api 
function getKanji(url, callback){
    request(url, function(error, response, body) {
        if (!error) {
            console.log(body)
            callback(body); //send response through call back
        }
        else{
            var errmsg = "error"
            console.log("there was an error. ");
            return errmsg;
        }
    });
}





// =====================================================
// this was used for wani kani - stuff for wani kani api 
// =====================================================
// module.exports = function(app) {
//     app.post("/api/routes", function(req, res){
//         // idk what im doing - 
//         // function gets kanji and sends back results to UI
//         getKanji(function (body){
//             res.json(body); 
//         })
//     });
// }

// =====================================================
// stuff for wani kani api 
// =====================================================
const getKanjiType_WK = {
    url: 'https://api.wanikani.com/v2/subjects?type=kanji',
    method: 'GET',
    headers: {
        Authorization: 'Bearer ' + key
    }
};

// function getKanji(callback){
//     request(getKanjiType_WK, function(error, response, body) {
//         if (!error) {
//             callback(body); //send response through call back
//         }
//         else{
//             var errmsg = "error"
//             console.log("there was an error. ");
//             return errmsg;
//         }
//     });
// }
