// I dont think i need this 
// function aJax(URL, METHOD, CALLBACK){ 
// 	$.ajax({
// 		url: URL,
// 		method: METHOD
// 	}).done(CALLBACK);
// }

// Global Variables - maybe bad idea... but we will see 
var userInput;
var Kanjiarr;
var KanjiarrUnique;
var SortedKanjiArr;

// helper functions

// this takes an arr of objects and adds count of kanji to it 
function addCountToObject(arr){
	let countedObject = countKanji(Kanjiarr);
	for (i=0; i<arr.length; i++){
		arr[i] = JSON.parse(arr[i]);
		arr[i].count = countedObject[arr[i].kanji]
	}
}


// return object of counted kanjis 
// function accepts only arrays! 
function countKanji(inputArray){
	//count dups in array 
	let count = inputArray.reduce(tallyupelements, {});
	return count; 
}

// takes an input of text and spits out an array of kanji
// if no kanji exits then it returns empty array. 
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
// i think this should take a parameter.  
// param is user input 
function SortKanjiArr(arr){
	// take array and compare it with the counted
	let countedKanjiObj = countKanji(arr);
	function compareFrequency(a, b) {
		return countedKanjiObj[b] - countedKanjiObj[a];
	}
	arr.sort(compareFrequency);
	return arr;
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
		createKanjiList(data); // its an array of objects 
	})
}

// DOM related function 

// is it possible to make this cleaner? idk 
// arrr is an arr of objects containing kanji info
function createKanjiList(arr){

	// add the  count so we can display it. 
	// this function has the json parse in it. 
	addCountToObject(arr)

	$("#kanjiInfo").empty();
	for (i=0; i<arr.length; i++){
		let li = $("<li>");
		let divKanji = $("<div>");
		let divJLPT = $("<div>");
		let divEN = $("<div>");
		let divCount = $("<div>");

		li.attr('id', 'kanji' + i);
		divKanji.text("Egnlish: " + arr[i].kanji);
		divEN.text("Egnlish: " + arr[i].heisig_en);
		divJLPT.text("JLPT N" + arr[i].jlpt);
		divCount.text("Frequency: " + arr[i].count);

		$("#kanjiInfo").append(li);

		$("#kanji" + i).append(divKanji);
		$("#kanji" + i).append(divCount);
		$("#kanji" + i).append(divEN);
		$("#kanji" + i).append(divJLPT);
	}
}

//EVENT LISTNERS --------------

// lets keep this simple with just functions. 
function buttonClick(){
	event.preventDefault();
	userInput = $("#kanjiInput").val().trim();
	Kanjiarr = makeArrofKanjiFromInput(userInput); // removes non kanji
	SortedKanjiArr = SortKanjiArr(Kanjiarr); // sorts kanji
	KanjiarrUnique = removeDuplicatesFromArray(SortedKanjiArr) // removes dupes 

	sendKanjiArray(KanjiarrUnique); // send to server
}

//button click handler. 
$(document).on("click", "#submit-kanji-button", buttonClick);