var path = require("path");
const kanji = require("../Controller/KanjiController");

module.exports = function(app) {

    // login route 
    app.post("/db/intitKanjiAdd", function(req, res){
        kanji.addKanji(req);
    })
    
    app.put("/db/kanji/:id", function(req, res) {
        console.log('this will be delete?')
    });
};