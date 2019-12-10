
//creating a ajax method so i can only call this once
function aJax(URL, METHOD, CALLBACK){ 
	$.ajax({
		url: URL,
		method: METHOD
	}).done(CALLBACK);
}

//when button click console log something. 


// TODO -- 
// 1. funtion to return true  or false if kanji exists in text. 
// 1a. attach event handler to button 
// 1b. write funtion for button - start with console log 
// 1c. find out why this didnt show up on github 
// 2. Look API from wanki kani and see if i can make calls. 