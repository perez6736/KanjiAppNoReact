// I dont think i need this 
// function aJax(URL, METHOD, CALLBACK){ 
// 	$.ajax({
// 		url: URL,
// 		method: METHOD
// 	}).done(CALLBACK);
// }

//return a bool if kanji exists in text. 
function doesKanjiExist(ch){
	return (ch >= "\u4e00" && ch <= "\u9faf") || (ch >= "\u3400" && ch <= "\u4dbf") || ch === "𠮟";
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

// accumalator for reduce function. 
function tallyupelements(obj, word){
	if(!obj[word]){
		obj[word] = 0; 
	}
	obj[word] ++;
	return obj;
}

// return object of counted kanjis 
// function accepts only arrays! 
function countKanji(inputArray){
	//count dups in array 
	let count = inputArray.reduce(tallyupelements, {});
	return count; 
}

// removes dups from an array 
function removeDuplicatesFromArray(arr){
	return arr.reduce((unique, item)=>
	unique.includes(item) ? unique : [...unique, item], [])
}

// this makes an arr of kanji from the input text box 
function makeArrofKanjiFromInput (){
	let Input = $("#kanjiInput").val().trim(); // trimed input from form. 
	Input = createKanjiArr(Input); //array of kanjis only 

	return Input;
}

// this send an array of kanji to the server. 
function sendKanjiArray(arr){
	// send an array of kanji 
	$.get("/api/kanji", {kanji: arr}, function(data){
		createKanjiList(data);
	})
}

// is it possible to make this cleaner? idk 
function createKanjiList(arr){
	$("#kanjiInfo").empty();
	for (i=0; i<arr.length; i++){
		arr[i] = JSON.parse(arr[i]);
		let li = $("<li>");
		let divKanji = $("<div>");
		let divJLPT = $("<div>");
		let divEN = $("<div>");

		li.attr('id', 'kanji' + i);
		divKanji.text("Egnlish: " + arr[i].kanji);
		divEN.text("Egnlish: " + arr[i].heisig_en);
		divJLPT.text("JLPT N" + arr[i].jlpt);
		$("#kanjiInfo").append(li);
		$("#kanji" + i).append(divKanji);
		$("#kanji" + i).append(divEN);
		$("#kanji" + i).append(divJLPT);
	}
}



// lets keep this simple with just functions. 
function buttonClick(){
	event.preventDefault();
	let Kanjiarr = makeArrofKanjiFromInput();
	Kanjiarr = removeDuplicatesFromArray(Kanjiarr)
	sendKanjiArray(Kanjiarr);
}

//button click handler. 
$(document).on("click", "#submit-kanji-button", buttonClick);