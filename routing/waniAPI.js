const config = {
    //WaniAPIKey : process.env.WaniAPIKey
}

// gets the groupme response when sommething is posted on groupme 
app.post("/", function(req, res){
    console.log("request recieved"); 
    console.log(req.body);
  
    // post something to the group when someone types something to the group. 
    .respond(req.body);
  
  });