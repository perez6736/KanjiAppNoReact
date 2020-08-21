
// parameter = object of username and password
function login (loginData){
	$.post("/login/auth", loginData, function(response){
        console.log(response);
        if(response){ //response will be true if login is successful.
            console.log(window.location.href)
            window.location.href = '/home'
        }
	})
}


//EVENT HANDLER METHODS ---------------------

function loginButtonEventHandler (){
    event.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();
    login({username: username, password: password}); //pass in as object to send to server. 
}


//button click handler. 
$(document).on("click", "#submit-login-button", loginButtonEventHandler);