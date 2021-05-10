//import the knaji dic file 
const parseString = require('xml2js').parseString;
const fs = require("fs");
var filePath = "kanjidic2.xml"


// this is a promise to get the kanji - 
// maybe didnt need a promise but didnt want to rewrite the fs.readfile more than twice
// also wanted to work with promises a bit. 
const XMLtoJSON = new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function(err, xml) {
        if (err) reject(err);
        parseString(xml, function (err, result) {
            if (err) console.log(err);
            let kanjidic = result.kanjidic2;
            resolve(kanjidic)
        });
    });
});



const kanjiXml = {

    // create function to get info on single kanji
    getKanjiInfo(kanji){
        XMLtoJSON.then((result) => {
            for(let i = 0; i<result.character.length; i++){
                if(result.character[i].literal[0] === kanji){
                    return(result.character[i]);
                }
                else return "no kanji was found."
            }
        })
    },

    // create function to get info on multiple kanji 
    getKanjisInfo(kanjis){ // an array of kanji
        XMLtoJSON.then((results) => {

        })
    },

    // create function to get kanjis with certain grade 
    getKanjiWithGrade(gradeLevel){
        XMLtoJSON.then((results) => {

        })
    },

    // create function to get kanjis with certain jlpt 
    getKanjiWithJLPTn(jlptLevel){
        XMLtoJSON.then((results) => {

        })
    },

    // create function to get kanji based on english word - heisig word or meaning. 
    getKanjiFromHeisigKeyword(heisigWord){
        XMLtoJSON.then((results) => {

        })
    },
}

module.exports = kanjiXml;

/*
example of what a json element looks like. 

character[{
  literal: [ '亜' ],
  codepoint: [ { cp_value: [Array] } ],
  radical: [ { rad_value: [Array] } ],
  misc: [
    {
      grade: [Array],
      stroke_count: [Array],
      variant: [Array],
      freq: [Array],
      jlpt: [Array]
    }
  ],
  dic_number: [ { dic_ref: [Array] } ],
  query_code: [ { q_code: [Array] } ],
  reading_meaning: [ { rmgroup: [Array], nanori: [Array] } ]
}]
*/