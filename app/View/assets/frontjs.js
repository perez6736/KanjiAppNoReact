// this function is the only place this global variable gets written over. 
function createKanjiCouintMap(arr){
	//count dups in array 
	return arr.reduce(tallyupelements, {});
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

function SortKanjiByJLPT(){
	let elements = $(".Kanji-wrapper").toArray()
	function compare(a,b){
		return $(b).attr("data-jlpt") - $(a).attr("data-jlpt")
	}
	let sortarr = elements.sort(compare);
	$("#Kanji-List").empty();
	$("#Kanji-List").append(sortarr);
	
}

function SortKanjiArrByCount(){
	let elements = $(".Kanji-wrapper").toArray()
	function compare(a,b){
		return $(b).attr("data-count") - $(a).attr("data-count")
	}
	let sortarr = elements.sort(compare);
	$("#Kanji-List").empty();
	$("#Kanji-List").append(sortarr);
	
}

function addCountToResponse(arr, countMap){
	arr.forEach(element => {
		element.count = countMap[element.literal[0]]
	});
	return arr;
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
function sendKanjiArray(arr, countMap){
	// send an array of kanji 
	$.get("/xml/kanjis", {kanji: arr}, function(data){
		let KanjisInfo = data.kanjisInfo;
		let KanjisInfoWithCount = addCountToResponse(KanjisInfo, countMap)
		createKanjiList(KanjisInfoWithCount)
		SortKanjiArrByCount(KanjisInfoWithCount)
		
	})
}

// DOM related function 

// is it possible to make this cleaner? idk 
// arrr is an arr of objects containing kanji info
function createKanjiList(arr){
	$("#Kanji-List").empty();
	for (i=0; i<arr.length; i++){
		// define the divs 
		if(arr[i].misc[0].jlpt === undefined){
			arr[i].misc[0].jlpt = [-1]
		}
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
		divSingleKanjiContainer.attr('data-Count', arr[i].count);
		divSingleKanjiContainer.attr('data-JLPT', arr[i].misc[0].jlpt[0])
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
		divJLPT.text((arr[i].misc[0].jlpt[0] === -1) ? 'No JLPT info' : `JLPT N${arr[i].misc[0].jlpt[0]}` );
		divCount.text("Frequency: " + arr[i].count);
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
	$('#sortCountID').prop("checked", true);
	let userInput = $("#kanjiInput").val().trim();
	if(doesKanjiExistinInput(userInput)){
		$('#SortKanjiRadio').show();
		let Kanjiarr = createKanjiArr(userInput); // removes non kanji
		let KanjiarrUnique = removeDuplicatesFromArray(Kanjiarr) // removes dupes
		let countMap = createKanjiCouintMap(Kanjiarr); // keep track of frequency of kanji
		sendKanjiArray(KanjiarrUnique, countMap); //send kanji array but count map is used in response. 
	}
	else{
		$("#error-text").show();
		console.log("no kanji in input. ");
	}
}

function sortKanji(){
	if($("#sortCountID").prop("checked")){
		$('#sortCountID').prop("checked", true);
		SortKanjiArrByCount();
	}
	// need to create this
	else if($("#sortJLPTID").prop("checked")){
		$('#sortJLPTID').prop("checked", true);
		SortKanjiByJLPT();
	}
}

//button click handler. 
$(document).on("click", "#submit-kanji-button", buttonClick);
