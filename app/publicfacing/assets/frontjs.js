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

// this will make an array of kanji 
function sendKanjiArray(){
	let kanjiInput = $("#kanjiInput").val().trim(); // trimed input from form. 
	let kanjiOnlyArr = createKanjiArr(kanjiInput); //array of kanjis only 
	let countedKanjiObj = countKanji(kanjiOnlyArr); //object of kanji counted up 
	let arrayOfKanjiInfo = []; 
	// send an array of kanji 
	$.get("/api/kanji", {kanji: kanjiOnlyArr}, function(data){
		arrayOfKanjiInfo.push(data);
		console.log(data);
	})
	// put kanji in <ol> id = "kanjiInfo" 
	// where to put this? 
	for (i=0; i<arrayOfKanjiInfo.length; i++){
		console.log("adfjsgsfg")
		let li = $("<li>");
		li.addClass("kanji");
		li.text(arrayOfKanjiInfo[i]);
		$("#kanjiInfo").append(li);
	}

}

// lets keep this simple with just functions. 
function buttonClick(){
	event.preventDefault();
	sendKanjiArray();
}




//button click handler. 
$(document).on("click", "#submit-kanji-button", buttonClick);

// TODO -- 

// 2. loop through list and create list of kanji -- make sure to add duplicate - done 
// 2a. loop through new list and order by most frequent kanji 
// 2b. gather count of occurence of kanji - done 
// 2c. research how to prepare data to send to wani kani api 

// 3. Look API from wanki kani and see if i can make calls. 
// 3a. Make call to wani kani 
// 3b. See how wanikani sends response 

// 4. Setup local server 
// 4a. Set server to display index.html - done 
// 4b. should api call be done client side or server side... is this a stupid question? 