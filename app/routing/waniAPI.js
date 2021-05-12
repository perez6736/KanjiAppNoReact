const request = require('request');
const xmlHelper = require('../kanjiXmlHelper/kanjiXmlHelper.js');
//
//https://kanjiapi.dev/kanji/[kanji]
//

// =====================================================
// stuff for routes - backend <==> frontend
// =====================================================
module.exports = function(app) {
    //anyhting related to frontend and back end comms goes in here. 

    // revieces an array of kanji from thrid party api.
    app.get("/api/kanji", function(req, res){
        let KanjiParam = req.query.kanji;
        console.log(req.query.kanji)

        // this maybe a controller i need to add? but this servers one purpose for now. 
        const promise = KanjiParam.map(word => new Promise (resolve => {
            getKanji({url: 'https://kanjiapi.dev/v1/kanji/' + encodeURIComponent(word)}, function(body){
                resolve(body);
            })
        }))
        Promise.all(promise).then(results => {
            res.json(results);
        })
    });

    app.get("/xml/kanji", function(req, res){
        let requestedKanjis = req.query.kanji[0];
        console.log(requestedKanjis)

        xmlHelper.getKanjiInfo(requestedKanjis).then((results) => {
            res.json(results);
        }).catch((err) => {
            res.json(err);
        })
    });

    app.get("/xml/kanjis", function(req, res){
        let requestedKanjis = req.query.kanji;
        console.log("this is kanjis")
        console.log(requestedKanjis)

        xmlHelper.getKanjisInfo(requestedKanjis).then((results) => {
            res.json(results);
        }).catch((err) => {
            res.json(err);
        })
    })
}





// helper function for the API 

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
