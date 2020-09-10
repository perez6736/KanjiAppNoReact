
// parameter = object of username and password
function logout(){
    //need to tell the server we are signed out. 
    $.post("/login/logout", function(response){
        if(response === true){
            window.location.href = '/login'
        }
	})
}


//EVENT HANDLER METHODS ---------------------

function logoutButtonEventHandler (){
    event.preventDefault();
    logout();
    console.log("logout was clicked")

}


//button click handler. 
$(document).on("click", "#header-sign-out", logoutButtonEventHandler);