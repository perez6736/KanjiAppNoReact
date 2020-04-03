// dependencies ===================================================== 

var kanji = require("../Model/kanji"); // use this to do stuff on db

// Routes ==========================================================
// this file will manipulate the data from the database... and should respond to the view where we can use it . 

module.exports = function(app) {

    // this is the method to create all the kanji in the DB initally. 
    app.post("/db/intitKanjiAdd", function(req, res){
        let kanjiInfo = req.body.kanji
        if (kanjiInfo.length > 0){
            for (i=0; i<kanjiInfo.length; i++){
                if(kanjiInfo[i].on_readings == undefined && kanjiInfo[i].kun_readings == undefined){
                    kanji.create(
                        [
                            "kanji", "grade", "JLPTlevel", "strokeOrder", "english", "unicodeValue"
                        ],
                        [
                            kanjiInfo[i].kanji, kanjiInfo[i].grade, kanjiInfo[i].jlpt, kanjiInfo[i].stroke_count, kanjiInfo[i].heisig_en, kanjiInfo[i].unicode
                        ],
                        function(){
                            console.log("done case 1");
                        }
                    );
                }
                else if(kanjiInfo[i].on_readings == undefined){
                    console.log(kanjiInfo[i].on_readings)
                    kanji.create(
                        [
                            "kanji", "grade", "JLPTlevel", "strokeOrder", "english", "kunReading", "unicodeValue"
                        ],
                        [
                            kanjiInfo[i].kanji, kanjiInfo[i].grade, kanjiInfo[i].jlpt, kanjiInfo[i].stroke_count, kanjiInfo[i].heisig_en, kanjiInfo[i].kun_readings[0], kanjiInfo[i].unicode
                        ],
                        function(){
                            console.log("done case 2");
                        }
                    );
                }
                else if(kanjiInfo[i].kun_readings == undefined){
                    console.log(kanjiInfo[i].on_readings)
                    kanji.create(
                        [
                            "kanji", "grade", "JLPTlevel", "strokeOrder", "english", "onReading", "unicodeValue"
                        ],
                        [
                            kanjiInfo[i].kanji, kanjiInfo[i].grade, kanjiInfo[i].jlpt, kanjiInfo[i].stroke_count, kanjiInfo[i].heisig_en, kanjiInfo[i].on_readings[0], kanjiInfo[i].unicode
                        ],
                        function(){
                            console.log("done case 2");
                        }
                    );
                }
                else{
                    console.log("adding kanji")
                    kanji.create(
                        [
                            "kanji", "grade", "JLPTlevel", "strokeOrder", "english","kunReading", "onReading", "unicodeValue"
                        ],
                        [
                            kanjiInfo[i].kanji, kanjiInfo[i].grade, kanjiInfo[i].jlpt, kanjiInfo[i].stroke_count, kanjiInfo[i].heisig_en, kanjiInfo[i].on_readings[0], kanjiInfo[i].kun_readings[0], kanjiInfo[i].unicode
                        ],
                        function(){
                            console.log("done case 3");
                        }
                    );
                }
    
            }
        }
        
    });

    // delete kanji ? - do i need this? 
    app.put("/db/kanji/:id", function(req, res) {
        console.log('this will be delete?')
    });

}

// return a bool
// do a select kanji from table - if exists true else false 
function doesKanjiExistinDB(kanjicharacter){
    kanji.selectWhere("kanji", kanjicharacter, function(res){
        console.log(res);
    });
}