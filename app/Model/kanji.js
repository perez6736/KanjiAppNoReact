// dependencies =====================6================================ 

var orm = require("../../config/orm"); 

// orm functions that return relevant data. 

var kanji = {
    // all: get all kanji 
    all: function(cb){
        orm.all("kanji", function(res){
            cb(res);
        });
    },

    selectWhere: function(cols, vals, cb){
        orm.selectWhere("kanji", cols, vals, function(res){
            cb(res);
        });
    },

    // create: // create a kanji
    create: function(cols, vals, cb){
        orm.create("kanji", cols, vals, function(res){
            cb(res);
        });
    },
    // update: // update existing kanji
    update: function(objColVals, condition, cb){
        orm.update("kanji", objColVals, condition, function(res){
            cb(res);
        })
    }
}

module.exports = kanji;