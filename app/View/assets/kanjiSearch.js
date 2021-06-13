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
		let kanjiliteral = arrOfKanjiObjects[i].literal[0]
		let kanjiJLPT = arrOfKanjiObjects[i].misc[0].jlpt[0]
		let kanjiMeaning = arrOfKanjiObjects[i].reading_meaning[0].rmgroup[0].meaning[0]
	
		// create a li 
		let li = $("<li class='Kanji-wrapper row  justify-content-around mt-4'>");
		li.attr('data-Kanji', kanjiliteral);
		li.attr('data-JLPT', kanjiJLPT);

		// construct the kanji character div. 
		let parentCol = $("<div class='col-auto'>");
		li.append(parentCol)
		let backgroundColorDiv = $("<div class='row' style= 'background: bisque;'>");
		parentCol.append(backgroundColorDiv)
		let childCol = $("<div class='col-12'>");
		backgroundColorDiv.append(childCol)
		let literalkanjiDiv = $("<div class='literalKanji'>");
		literalkanjiDiv.text(kanjiliteral)
		childCol.append(literalkanjiDiv)

		//kanji infor part. 
		let kanjiInfoParentDiv = $("<div class='col-9 rounded border p-2' style= 'background: #F0F8FF;'>");
		let meaningDiv = $("<div class='Kanji-English row m-1'>");
		meaningDiv.text(`Meaning: ${kanjiMeaning}`)
		let JLPTDiv = $("<div class='JLPT-level row m-1'>");
		JLPTDiv.text(`JLPT N ${kanjiJLPT}`)
		let commonWordRowText = $("<div class='commonWordText row m-1'>");
		let commonWordWrapper = $("<div class='commonVocabWrapper row m-1'>");
		
		// these are place holders. 
		let commonWord1 = $("<div class='commonVocab col-4 m-1'>");
		let commonWord2 = $("<div class='commonVocab col-4 m-1'>");
		let commonWord3 = $("<div class='commonVocab col-4 m-1'>");
		let commonWord4 = $("<div class='commonVocab col-4 m-1'>");
		let commonWord5 = $("<div class='commonVocab col-4 m-1'>");
		let commonWord6 = $("<div class='commonVocab col-4 m-1'>");
		commonWord1.text("人")
		commonWord2.text("人間")
		commonWord3.text("夫人")
		commonWord4.text("人々")
		commonWord5.text("犯人")
		commonWord6.text("主人")

		//append
		li.append(kanjiInfoParentDiv)
		kanjiInfoParentDiv.append(meaningDiv)
		kanjiInfoParentDiv.append(JLPTDiv)
		kanjiInfoParentDiv.append(commonWordRowText)
		kanjiInfoParentDiv.append(commonWordWrapper)
		commonWordWrapper.append(commonWord1)
		commonWordWrapper.append(commonWord2)
		commonWordWrapper.append(commonWord3)
		commonWordWrapper.append(commonWord4)
		commonWordWrapper.append(commonWord5)
		commonWordWrapper.append(commonWord6)

		$("#Kanji-List").append(li);
	}
}

function getCommonVocabWords(kanji){

}

function attachCommonWordsToDOM(kanji){
	let commonWords = getCommonVocabWords(kanji)
}

function doesKanjiExistinInput(arr){
	for(i=0; i<arr.length; i++){
		if(isKanji(arr[i])){
			return true;
		}
	}
	return false;
}

//return a bool if character is a kanji character. 
function isKanji(ch){
	return (ch >= "\u4e00" && ch <= "\u9faf") || (ch >= "\u3400" && ch <= "\u4dbf") || ch === "𠮟";
}

function searchKanji(){
	event.preventDefault();
	// read input
	let userInput = $("#kanjiInput").val().trim();
	let userInputarr = userInput.split('')
	console.log(userInput)
	// make sure its kanji 
	if(doesKanjiExistinInput(userInputarr)){
		// send to server for search 
		sendKanjiArray(userInputarr); //send kanji array but count map is used in response. 
	}
	else{
		console.log("no kanji in input. ");
	}

}

//button click handler. 
$(document).on("click", "#kanji-search", searchKanji);

sendKanjiArray(intialKanjiToLoad);
