// dependencies =====================6================================ 

var orm = require("../../config/orm"); 

// orm functions that return relevant data. 

var auth = {
    selectWhere: function(cols, vals, cb){
        orm.selectWhere("kanji", cols, vals, function(res){
            cb(res);
        });
    }
}