// dependencies ===================================================== 

var auth = require("../Model/auth"); // use this to do stuff on db
var session = require('express-session');

// ==========================================================
// do stuff with data  from data base. 

module.exports = function(app) {
    app.post("/login/auth", function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		if (username && password) {
			// check db if username and pw exist  by calling doing a select on the users table
			auth.selectWhereAND(
				["username", "userPassword"], 
				[username, password],
				function(results){
					console.log(results);
					res.send(results)
					return results;
				}
			)
		}
    });

}

// 	if (username && password) {
//         // check db if username and pw exist 
// 		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
// 			if (results.length > 0) {
// 				req.session.loggedin = true;
// 				req.session.username = username;
// 				res.redirect('/home');
// 			} else {
// 				res.send('Incorrect Username and/or Password!');
// 			}			
// 			res.end();
// 		});
// } else {
// 	res.send('Please enter Username and Password!');
// 	res.end();
// }