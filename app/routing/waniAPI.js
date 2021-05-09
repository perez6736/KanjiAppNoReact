const request = require('request');
const xmlHelper = require()
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
        let requestedKanjis = req.query.kanji;
        console.log(req.query.kanji)

        // need a function to grab the kanji info from the xml file. 
        res.json(xmlHelper.getKanjis(requestedKanjis))
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
