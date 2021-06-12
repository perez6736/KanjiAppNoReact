// lets make a call the server for some kanji characters 
//人 一 見 言 気

const intialKanjiToLoad = ["人", "一", "見", "言", "気"]
// this send an array of kanji to the server. 
function sendKanjiArray(arr){
	// send an array of kanji 
	$.get("/xml/kanjis", {kanji: arr}, function(data){
		let KanjisInfo = data.kanjisInfo;
        console.log(KanjisInfo)
        createKanjiList(KanjisInfo)
	})
}

function createKanjiList(arrOfKanjiObjects){
	$("#Kanji-List").empty();
	for (i=0; i<arrOfKanjiObjects.length; i++){
		// define the divs 
		if(arrOfKanjiObjects[i].misc[0].jlpt === undefined){
			arrOfKanjiObjects[i].misc[0].jlpt = [-1]
		}
		let divSingleKanjiContainer = $("<div>");
		let divKanjiInfo = $("<div>");
		let divKanji = $("<div>");
		let divJLPT = $("<div>");
		let divEN = $("<div>");
		let addtoDBbutton = $('<button/>', {
			text: "add " + arrOfKanjiObjects[i].kanji + " to DB",
			addClass: 'addSingleKanji'
		  });
		//give the attr
		divSingleKanjiContainer.attr('data-Kanji', arrOfKanjiObjects[i].literal[0]);
		divSingleKanjiContainer.attr('data-JLPT', arrOfKanjiObjects[i].misc[0].jlpt[0])
		divSingleKanjiContainer.addClass("Kanji-wrapper row")
		divKanjiInfo.addClass("Kanji-Info")
		divKanji.addClass("Kanji");
		divJLPT.addClass("JLPT-level row");
		divEN.addClass("Kanji-English row ");
		addtoDBbutton.attr('data-Kanji', arrOfKanjiObjects[i].literal[0]);
		// set text 
		divKanji.text(arrOfKanjiObjects[i].literal[0]);
		divEN.text("English: " + arrOfKanjiObjects[i].reading_meaning[0].rmgroup[0].meaning[0]);
		divJLPT.text((arrOfKanjiObjects[i].misc[0].jlpt[0] === -1) ? 'No JLPT info' : `JLPT N${arrOfKanjiObjects[i].misc[0].jlpt[0]}` );
		// append it all 
		$("#Kanji-List").append(divSingleKanjiContainer);
		divSingleKanjiContainer.append(divKanji);
		divSingleKanjiContainer.append(divKanjiInfo);
		divKanjiInfo.append(divEN);
		divKanjiInfo.append(divJLPT);
	}
}

function getCommonVocabWords(arrOfKanjiObjects){
    arrOfKanjiObjects.forEach(kanji => {
        let character = kanji.literal[0]
        console.log(character);
        
    });
}

// sendKanjiArray(intialKanjiToLoad);
