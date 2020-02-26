// dependencies ===================================================== 

var express = require("express");
var router = express.Router();
var orm = require("../Model/orm.js"); // use this to to get the data... 

// Routes ==========================================================
// this file will manipulate the data from the database... and should respond to the view where we can use it . 

// this creates a kanji in database. 
router.post("/api/burgers", function(req, res){
    console.log('create a kanji in database ')
});

// delete kanji ? - do i need this? 
router.put("/api/kanji/:id", function(req, res) {
    console.log('this will be delete?')
});

module.exports = router;