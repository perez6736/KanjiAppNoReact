function confirmPasswordsMatch (pw1, pw2){
    if(pw1 === pw2){
        return true;
    }else{
        return false;
    }
}


// parameter = object of username and password
function registerUser (loginData){
	$.post("/login/register", loginData, function(response){
        console.log(response);
        if(response){ //response will be true if login is successful.
            console.log(window.location.href)
            window.location.href = '/home'
        }
	})
}


//EVENT HANDLER METHODS ---------------------

function registrationButtonEventHandler (){
    event.preventDefault();
    // add validation.  
    let username = $("#username").val();
    let password = $("#password").val();
    let email = $("#email").val();
    if(confirmPasswordsMatch && username != null && password != null){
        registerUser({username: username, password: password, email: email}); //pass in as object to send to server. 
    }else{
        // show an error. 
    }
}


//button click handler. 
$(document).on("click", "#submit-user-registration", registrationButtonEventHandler);