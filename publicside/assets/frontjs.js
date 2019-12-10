
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
// 1. funtion to return true  or false if kanji exists in text. 
// 1a. attach event handler to button 
// 1b. write funtion for button - start with console log 
// 1c. find out why this didnt show up on github 
// 2. Look API from wanki kani and see if i can make calls. 