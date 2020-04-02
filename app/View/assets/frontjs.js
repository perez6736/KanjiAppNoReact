
// Global Variables - maybe bad idea... but we will see 
var userInput;
var Kanjiarr;
var KanjiarrUnique;
var SortedKanjiArr;
var KanjiObject; 

// helper functions

// this takes an arr of objects and adds count of kanji to it 
// adds frequency of kanji to the kanji object. 
// makes the arr into an object too 
function addCountToObject(arr){
	let countedObject = countKanji(Kanjiarr);
	for (i=0; i<arr.length; i++){
		arr[i] = JSON.parse(arr[i]);
		arr[i].count = countedObject[arr[i].kanji]
	}
}

// return object of counted kanjis 
// function accepts only arrays! 
// this is used in the addCounttoObject to get frequency of kanji 
function countKanji(inputArray){
	//count dups in array 
	let count = inputArray.reduce(tallyupelements, {});
	return count; 
}

// takes an input of text and spits out an array of kanji
// if no kanji exits then it returns empty array. 
// this function is what is originally called before sending to api 
function createKanjiArr(input){
	let inputArr = input.split("");
	let kanjiOnlyArr = []; 
	for(i=0; i<inputArr.length; i++){
		if(doesKanjiExist(inputArr[i])){ 
			kanjiOnlyArr.push(inputArr[i]);
		}
	}
	return kanjiOnlyArr;
}

function doesKanjiExistinInput(arr){
	for(i=0; i<arr.length; i++){
		if(doesKanjiExist(arr[i])){
			return true;
		}
	}
	return false;
}

//return a bool if kanji exists in text. 
function doesKanjiExist(ch){
	return (ch >= "\u4e00" && ch <= "\u9faf") || (ch >= "\u3400" && ch <= "\u4dbf") || ch === "𠮟";
}

// this makes an arr of kanji from the input text box 
// put user input here 
function makeArrofKanjiFromInput (arr){
	let Input = arr  
	Input = createKanjiArr(Input); //array of kanjis only 
	return Input;
}

// sorts kanji by frequency 
// param is user input 
function SortKanjiArrByCount(arr){
	// take array and compare it with the counted
	function compare (a,b){
		return b.count - a.count; 
	}
	let sortarr = arr.sort(compare);
	return sortarr; 
}

// needs array of kanji objects
function SortKanjiByJLPT(arr){
	// take array and compare it with the counted
	function compare (a,b){
		return b.jlpt - a.jlpt; 
	}
	let sortarr = arr.sort(compare);
	return sortarr; 
}

// removes dups from an array 
function removeDuplicatesFromArray(arr){
	return arr.reduce((unique, item)=>
	unique.includes(item) ? unique : [...unique, item], [])
}

// accumalator for reduce function. 
function tallyupelements(obj, word){
	if(!obj[word]){
		obj[word] = 0; 
	}
	obj[word] ++;
	return obj;
}

// request related functions 

// this send an array of kanji to the server. 
function sendKanjiArray(arr){
	// send an array of kanji 
	$.get("/api/kanji", {kanji: arr}, function(data){
		// this gets data back from 
		KanjiObject = data;

		// add the count so we can display it. 
		// this function has the json parse in it. 
		// we need to turn array into object here and add count. 
		addCountToObject(KanjiObject);
		sortKanji(); //radio button function - need to know how to display the kanji intially 
	})
}

// if kanji is missing from our dictionary we want to add it. 
// initially we will use this to add all the kanji to the database. 
function addKanjitoDB(kanjiDataObject){
	$.post("/db/intitKanjiAdd", kanjiDataObject, function(data){
		console.log("posted kanji to dicitonary")
	})
}
// we will want to see all kanji information eventually 
function getAllKanji(kanjiDataObject){
	$.get("/kanji-dictionary", kanjiDataObject, function(data){
		console.log("get all kanjis")
	})
}

// DOM related function 

// is it possible to make this cleaner? idk 
// arrr is an arr of objects containing kanji info
function createKanjiList(arr){

	$("#Kanji-List").empty();
	for (i=0; i<arr.length; i++){
		// define the divs 
		let divSingleKanjiContainer = $("<div>");
		let divKanjiInfo = $("<div>");
		let divKanji = $("<div>");
		let divJLPT = $("<div>");
		let divEN = $("<div>");
		let divCount = $("<div>");

		//give the attr
		divSingleKanjiContainer.attr('data-Kanji', arr[i].kanji);
		divSingleKanjiContainer.attr('data-Count', arr[i].count);
		divSingleKanjiContainer.attr('data-JLPT', arr[i].jlpt);
		divSingleKanjiContainer.addClass("Kanji-wrapper")
		divKanjiInfo.addClass("Kanji-Info")
		divKanji.addClass("Kanji");
		divJLPT.addClass("JLPT-level");
		divEN.addClass("Kanji-English");
		divCount.addClass("Kanji-Count");

		// set text 
		divKanji.text(arr[i].kanji);
		divEN.text("English: " + arr[i].heisig_en);
		divJLPT.text("JLPT N" + arr[i].jlpt);
		divCount.text("Frequency: " + arr[i].count);

		// append it all 
		$("#Kanji-List").append(divSingleKanjiContainer);
		divSingleKanjiContainer.append(divKanji);
		divSingleKanjiContainer.append(divKanjiInfo);
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
	userInput = $("#kanjiInput").val().trim();
	if(doesKanjiExistinInput(userInput)){
		$('#SortKanjiRadio').show();
		Kanjiarr = makeArrofKanjiFromInput(userInput); // removes non kanji
		KanjiarrUnique = removeDuplicatesFromArray(Kanjiarr) // removes dupes 
		sendKanjiArray(KanjiarrUnique); // send to server

	}
	else{
		$("#error-text").show();
		console.log("no kanji in input. ");
	}

}

function AddtoDB (){
	// just need to send the json object to the server.
	addKanjitoDB({kanji: KanjiObject});
	console.log(KanjiObject); 
}

function sortKanji(){
	if($("#sortCountID").is(':checked')){
		createKanjiList(SortKanjiArrByCount(KanjiObject));
	}
	else if($("#sortJLPTID").is(':checked')){
		createKanjiList(SortKanjiByJLPT(KanjiObject));
	}

}

//button click handler. 
$(document).on("click", "#submit-kanji-button", buttonClick);
$(document).on("click", "#addKanjitoDB", AddtoDB);