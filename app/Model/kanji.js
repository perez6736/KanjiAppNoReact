// dependencies =====================6================================ 

var orm = require("../../config/orm"); 

// orm functions that return relevant data. 

var kanji = {
    // all: get all burgers 
    all: function(cb){
        orm.all("kanji", function(res){
            cb(res);
        });
    },
    // create: // create a burger
    create: function(cols, vals, cb){
        orm.create("kanji", cols, vals, function(res){
            cb(res);
        });
    },
    // update: // update existing burger
    update: function(objColVals, condition, cb){
        orm.update("kanji", objColVals, condition, function(res){
            cb(res);
        })
    }
}

module.exports = kanji;