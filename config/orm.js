// dependencies ===================================================== 

var connection = require("./connection.js"); 

// orm =========================================================

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
  

  // Object for all our SQL statement functions.
  var orm = {
    all: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    selectWhere: function(tableInput, col, value, cb) {
      var queryString = "SELECT * FROM " + tableInput;
      
      queryString += " WHERE " + col;
      queryString += " = '" + value + "'";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    selectWhereAND: function(tableInput, col, value, cb){
      // examplle of cols and val BELOW 
      // ["username", "userPassword"], col 
      //	[username, password], val 
      var queryString = "SELECT * FROM " + tableInput;;
      
      queryString += " WHERE " + col[0];
      queryString += " = " + "'" + value[0] + "'";

      for(i=1; i<col.length; i++){
        queryString += " AND " + col[1];;
        queryString += " = " + "'" + value[1] + "'";
      }
      //console.log(queryString)
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    selectWhereOR: function(tableInput, col, value, cb){
      // examplle of cols and val BELOW 
      // ["username", "userPassword"], col 
      //	[username, password], val 
      var queryString = "SELECT * FROM " + tableInput;;
      
      queryString += " WHERE " + col[0];
      queryString += " = " + "'" + value[0] + "'";

      for(i=1; i<col.length; i++){
        queryString += " OR " + col[1];;
        queryString += " = " + "'" + value[1] + "'";
      }
      //console.log(queryString)
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    create: function(table, cols, vals, cb) {
        //INSERT 
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      //console.log(queryString);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },


    // An example of objColVals would be {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb) {
        // UPDATE 
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      //console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },


    delete: function(table, condition, cb) {
      var queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;
  
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    }

    //can add more sql statements here based on my needs. 

    // or maybe use a orm npm but i dont think i need anyhting more complicated thatn this. 
  };
  
  // Export the orm object for the model
  module.exports = orm;