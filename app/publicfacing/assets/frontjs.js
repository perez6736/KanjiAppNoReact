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
	var inputArr = input.split("");
	var kanjiOnlyArr = []; 

	for(i=0; i<inputArr.length; i++){
		if(doesKanjiExist(inputArr[i])){ 
			console.log("found a kanji");
			kanjiOnlyArr.push(inputArr[i]);
		}
		else{
			console.log("there is no kanji.");
		}
	}
	console.log(kanjiOnlyArr);
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
	var count = inputArray.reduce(tallyupelements, {});

	return count; 
}

function buttonClick(){
	event.preventDefault();
	// need to send an object most likely 
	var kanjiInput = $("#kanjiInput").val().trim(); // trimed input from form. 
	var kanjiOnlyArr = createKanjiArr(kanjiInput); //array of kanjis only 
	var countedKanjiObj = countKanji(kanjiOnlyArr); //object of kanji counted up 
	var arrayOfKanjiInfo = []; 
	console.log(kanjiInput)
	// send an array of kanji 

	// i dont like this because i have to send multiple requests to the server 
	// and then send more request to server to api 
	// i want to be able to send one request to server then the server does it. 
	for(i=0; i<kanjiOnlyArr.length; i++ ){
		$.get("/api/kanji", {kanji: kanjiOnlyArr[i]}, function(data){
			arrayOfKanjiInfo.push(data);
			console.log(data);
		});	
	}
	console.log(arrayOfKanjiInfo);
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