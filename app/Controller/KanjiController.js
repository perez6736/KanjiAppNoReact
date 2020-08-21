// dependencies ===================================================== 

var kanji = require("../Model/kanji"); // use this to do stuff on db

//Controller ==========================================================
// this should be a object of functions that grab raw data from db and manipulate into useable stuff. 
// can also be functions that takes data and formats it to put into database. 

const KanjiController = {
    addKanji: function (input, ouput){
        let kanjiInfo = input.body.kanji
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
                            return "done case 1"
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
                            return "done case 2"
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
                            console.log("done case 3");
                            return "done case 3"
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
                            console.log("done case 4");
                            return "done case 4"
                        }
                    );
                }
    
            }
        }
    },

    deleteKanji: function(input){
        return input + " deleted."
    }, 

    // return a bool
    // do a select kanji from table - if exists true else false 
    doesKanjiExistinDB: function (kanjicharacter){
        kanji.selectWhere("kanji", kanjicharacter, function(res){
            console.log(res);
            if(res.lenght > 0){
                return true;
            } else{
                return false;
            }
        });
    }
}

module.exports = KanjiController;