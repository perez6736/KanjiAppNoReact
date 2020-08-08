// dependencies =====================6================================ 

var orm = require("../../config/orm"); 

// orm functions that return relevant data. 

var auth = {
    selectWhere: function(cols, vals, cb){
        orm.selectWhere("users", cols, vals, function(res){
            cb(res);
        });
    },

    selectWhereAND: function(cols, vals, cb){
        orm.selectWhereAND("users", cols, vals, function(res){
            cb(res);
        });
    }
}

module.exports = auth;