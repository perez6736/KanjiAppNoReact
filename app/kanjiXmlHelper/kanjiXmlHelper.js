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
            if (err) reject(err);
            let kanjidic = result.kanjidic2;
            resolve(kanjidic)
        });
    });
});



const kanjiXml = {

    // function to get info on single kanji
    getKanjiInfo: (kanji) => {
        return new Promise((resolve, reject) => {
            XMLtoJSON.then((results) => {
                for(let i = 0; i<results.character.length; i++){
                    if(results.character[i].literal[0] === kanji){
                        return resolve(results.character[i]);
                    }
                }
                reject("no kanji was found.")
            })
        })
    },

    // create function to get info on multiple kanji 
    getKanjisInfo: (kanjis) => {
        return new Promise((resolve) => {
            XMLtoJSON.then((results) => {
                let kanjisInfo = []
                kanjis.forEach(kanji => {
                    for(let i = 0; i<results.character.length; i++){
                        if(results.character[i].literal[0] === kanji){
                            kanjisInfo.push(results.character[i]);
                        }
                    }
                });
                resolve({kanjisInfo})
            })
        })
    },

    // create function to get kanjis with certain grade 
    getKanjiWithGrade(gradeLevel){
        return new Promise((resolve) => {
            XMLtoJSON.then((results) => {
                let kanjisInfo = []
                for(let i = 0; i<results.character.length; i++){
                    if(results.character[i].misc[0].grade != undefined && parseInt(results.character[i].misc[0].grade[0]) === gradeLevel){
                        kanjisInfo.push(results.character[i]);
                    }
                }
                resolve({kanjisInfo})
            })
        })
    },

    // create function to get kanjis with certain jlpt 
    // uses the pre-2010 level of the Japanese Language Proficiency Test (JLPT) in which the kanji occurs (1-4).
    getKanjiWithJLPTn(jlptLevel){
        return new Promise((resolve) => {
            XMLtoJSON.then((results) => {
                let kanjisInfo = []
                for(let i = 0; i<results.character.length; i++){
                    if(results.character[i].misc[0].jlpt != undefined && parseInt(results.character[i].misc[0].jlpt[0]) === jlptLevel){
                        kanjisInfo.push(results.character[i]);
                    }
                }
                resolve({kanjisInfo})
            })
        })
    },

    // create function to get kanjis with certain grade 
    getKanjiAllJoyoKanji(){
        return new Promise((resolve) => {
            XMLtoJSON.then((results) => {
                let kanjisInfo = []
                for(let i = 0; i<results.character.length; i++){
                    if(results.character[i].misc[0].grade != undefined){
                        kanjisInfo.push(results.character[i]);
                    }
                }
                resolve({kanjisInfo})
            })
        })
    },

    // create function to get kanjis with certain jlpt 
    getKanjiAllJlptKanji(){
        return new Promise((resolve) => {
            XMLtoJSON.then((results) => {
                let kanjisInfo = []
                for(let i = 0; i<results.character.length; i++){
                    if(results.character[i].misc[0].jlpt != undefined){
                        kanjisInfo.push(results.character[i]);
                    }
                }
                resolve({kanjisInfo})
            })
        })
    },

    // create function to get kanji based on english word - heisig word or meaning. 
    getKanjiFromMeaning(meaning){
        return new Promise((resolve) => {
            XMLtoJSON.then((results) => {
                //return kanji with a meaning of heisigWord
                let kanjisInfo = []
                for(let i = 0; i<results.character.length; i++){
                    if(results.character[i].reading_meaning != undefined && results.character[i].reading_meaning[0].rmgroup[0].meaning != undefined){
                        for(let j = 0; j<results.character[i].reading_meaning[0].rmgroup[0].meaning.length; j++){
                            if (results.character[i].reading_meaning[0].rmgroup[0].meaning[j] === meaning){
                                kanjisInfo.push(results.character[i]);
                            }
                        }
                    }
                }
                resolve({kanjisInfo})
            })
        })
    },


}

kanjiXml.getKanjiFromMeaning("castle")

module.exports = kanjiXml;

/*
TODO- this json is kinda ugly. I want to reformat this to make cleaner json to give to front end or api. 
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


what it should look like. 
character[{
  literal: 亜,
  codepoint: [ { cp_value: [Array] } ],
  radical: [ { rad_value: [Array] } ],
  misc: [
    {
      grade: 1,
      stroke_count: 7,
      variant: [Array],
      freq: 145,
      jlpt: 1
    }
  ],
  meaning: { english: [Array], spanish: [Array] }
  dic_number: [ { dic_ref: [Array] } ],
  query_code: [ { q_code: [Array] } ],
  reading_meaning: [ { rmgroup: [Array], nanori: [Array] } ]
}]
*/