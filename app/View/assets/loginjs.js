// parameter = object of username and password
function login (loginData){
	$.post("/login/auth", loginData, function(data){
        console.log("login activted.");
        console.log(data);
	})
}



function loginButtonEventHandler (){
    event.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(username, password);
    login({username: username, password: password}); //pass in as object to send to server. 
}


//button click handler. 
$(document).on("click", "#submit-login-button", loginButtonEventHandler);