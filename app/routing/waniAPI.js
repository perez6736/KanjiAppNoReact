// this will need to change when i push it to heroku. 
// var WKkeys = require('../../configkeys/apiKeys.js');
const request = require('request');
// var key = WKkeys.apiKeys.waniKani;


//
//https://kanjiapi.dev/kanji/[kanji]
//

// =====================================================
// stuff for routes - backend <==> frontend
// =====================================================
module.exports = function(app) {
    //anyhting related to frontend and back end comms goes in here. 

    // revieces an array of kanji 
    app.get("/api/kanji", function(req, res){
        let KanjiParam = req.query.kanji;
        console.log(req.query.kanji)

        const promise = KanjiParam.map(word => new Promise (resolve => {
            getKanji({url: 'https://kanjiapi.dev/v1/kanji/' + encodeURIComponent(word)}, function(body){
                resolve(body);
            })
        }))
        Promise.all(promise).then(results => {
            res.json(results);
        })
    });
}

//new kanji api 
function getKanji(url, callback){
    request(url, function(error, response, body) {
        if (!error) {
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
// const getKanjiType_WK = {
//     url: 'https://api.wanikani.com/v2/subjects?type=kanji',
//     method: 'GET',
//     headers: {
//         Authorization: 'Bearer ' + key
//     }
// };

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
