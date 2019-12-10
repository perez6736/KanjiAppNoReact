
//creating a ajax method so i can only call this once
function aJax(URL, METHOD, CALLBACK){ 
	$.ajax({
		url: URL,
		method: METHOD
	}).done(CALLBACK);
}

//return a bool if kanji exists in text. 
function doesKanjiExist(ch){
	return (ch >= "\u4e00" && ch <= "\u9faf") || (ch >= "\u3400" && ch <= "\u4dbf") || ch === "𠮟";
}

function buttonClick(){
	event.preventDefault();
	var kaniInput = $("#kanjiInput").val().trim();
	//run function and pass text into it. 
	if(doesKanjiExist(kaniInput)){
		console.log("there is kanji");
	}
	else{
		console.log("there is no kanji.")
	}
	
}

//button click handler. 
$(document).on("click", "#submit-kanji-button", buttonClick);

// TODO -- 
// 1. funtion to return true  or false if kanji exists in text. - done
// 1a. attach event handler to button  - done 
// 1b. write funtion for button - start with console log - done 
// 1c. find out why this didnt show up on github - done 

// 2. loop through list and create list of kanji -- make sure to add duplicate 
// 2a. loop through new list and order by most frequent kanji 
// 2b. gather count of occurence of kanji 
// 2c. research how to prepare data to send to wani kani api 

// 3. Look API from wanki kani and see if i can make calls. 
// 3a. Make call to wani kani 
// 3b. See how wanikani sends response 

// 4. Setup local server 
// 4a. Set server to display index.html 
// 4b. should api call be done client side or server side... is this a stupid question? 
// 4c. what responsiblites should the server have besides routing? look this up. 
// 4d. this is fun