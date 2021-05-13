var kanjiCountMap;
var KanjisInfo;
// this function is the only place this global variable gets written over. 
function createKanjiCouintMap(arr){
	//count dups in array 
	kanjiCountMap = arr.reduce(tallyupelements, {});
}
// accumalator for reduce function. 
function tallyupelements(obj, kanji){
	if(!obj[kanji]){
		obj[kanji] = 0; 
	}
	obj[kanji] ++;
	return obj;
}

// helper functions

function SortKanjiArrByCount(arr){
	function compare(a,b){
		return kanjiCountMap[b.literal[0]] - kanjiCountMap[a.literal[0]]
	}
	let sortarr = arr.sort(compare);
	return sortarr;
}

function SortKanjiByJLPT(arr){
	console.log("create this function.")
}

// needs array of kanji objects
function SortKanjiByJLPT(arr){
// use the data attributes 
}

// takes an input of text and spits out an array of kanji
// if no kanji exits then it returns empty array. 
// this function is what is originally called before sending to api 
function createKanjiArr(input){
	let inputArr = input.split("");
	let kanjiOnlyArr = []; 
	for(i=0; i<inputArr.length; i++){
		if(isKanji(inputArr[i])){ 
			kanjiOnlyArr.push(inputArr[i]);
		}
	}
	return kanjiOnlyArr;
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

// removes dups from an array 
function removeDuplicatesFromArray(arr){
	return arr.reduce((unique, item)=>
	unique.includes(item) ? unique : [...unique, item], [])
}

// request related functions 

// this send an array of kanji to the server. 
function sendKanjiArray(arr, count){
	// send an array of kanji 
	$.get("/xml/kanjis", {kanji: arr}, function(data){
		// this gets data back from 
		KanjisInfo = data.kanjisInfo;
		createKanjiList(SortKanjiArrByCount(KanjisInfo), count)
		
	})
}

// DOM related function 

// is it possible to make this cleaner? idk 
// arrr is an arr of objects containing kanji info
function createKanjiList(arr, count){
	$("#Kanji-List").empty();
	for (i=0; i<arr.length; i++){
		console.log(arr[i])
		// define the divs 
		let divSingleKanjiContainer = $("<div>");
		let divKanjiInfo = $("<div>");
		let divKanji = $("<div>");
		let divJLPT = $("<div>");
		let divEN = $("<div>");
		let divCount = $("<div>");
		let addtoDBbutton = $('<button/>', {
			text: "add " + arr[i].kanji + " to DB",
			addClass: 'addSingleKanji'
		  });
		//give the attr
		divSingleKanjiContainer.attr('data-Kanji', arr[i].literal[0]);
		divSingleKanjiContainer.attr('data-Count', kanjiCountMap[arr[i].literal[0]]);
		divSingleKanjiContainer.attr('data-JLPT', (arr[i].misc[0].jlpt === undefined) ? 'NA' : arr[i].misc[0].jlpt[0]);
		divSingleKanjiContainer.addClass("Kanji-wrapper")
		divKanjiInfo.addClass("Kanji-Info")
		divKanji.addClass("Kanji");
		divJLPT.addClass("JLPT-level");
		divEN.addClass("Kanji-English");
		divCount.addClass("Kanji-Count");
		addtoDBbutton.attr('data-Kanji', arr[i].literal[0]);
		// set text 
		divKanji.text(arr[i].literal[0]);
		divEN.text("English: " + arr[i].reading_meaning[0].rmgroup[0].meaning[0]);
		divJLPT.text("JLPT N" + (arr[i].misc[0].jlpt === undefined) ? 'NA' : arr[i].misc[0].jlpt[0]);
		divCount.text("Frequency: " + kanjiCountMap[arr[i].literal[0]]);
		// append it all 
		$("#Kanji-List").append(divSingleKanjiContainer);
		divSingleKanjiContainer.append(divKanji);
		divSingleKanjiContainer.append(divKanjiInfo);
		divSingleKanjiContainer.append(addtoDBbutton);
		divKanjiInfo.append(divCount);
		divKanjiInfo.append(divEN);
		divKanjiInfo.append(divJLPT);
	}
}

//EVENT LISTNERS --------------

// lets keep this simple with just functions. 
function buttonClick(){
	event.preventDefault();
	$("#error-text").hide();
	let userInput = $("#kanjiInput").val().trim();
	if(doesKanjiExistinInput(userInput)){
		$('#SortKanjiRadio').show();
		let Kanjiarr = createKanjiArr(userInput); // removes non kanji
		let KanjiarrUnique = removeDuplicatesFromArray(Kanjiarr) // removes dupes
		createKanjiCouintMap(Kanjiarr); // with the Kanjiarr I need to make a map {charcter: frequency}]
		sendKanjiArray(KanjiarrUnique); // send to server

	}
	else{
		$("#error-text").show();
		console.log("no kanji in input. ");
	}

}

function sortKanji(){
	if($("#sortCountID").is(':checked')){
		// this doesnt work a second time. 
		createKanjiList(SortKanjiArrByCount(KanjisInfo));
	}
	// need to create this
	else if($("#sortJLPTID").is(':checked')){
		createKanjiList(SortKanjiByJLPT(KanjisInfo));
	}
}

//button click handler. 
$(document).on("click", "#submit-kanji-button", buttonClick);

// things i need to do.
// remove the global variables. 
// add the count to the data attributes 
// use the data attributes to sort the list. 
// - for frequency and jlpt
// handle case where no jlpt level exists. 