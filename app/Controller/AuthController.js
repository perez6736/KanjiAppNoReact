const bcrypt = require('bcrypt');
const saltRounds = 10;

// dependencies ===================================================== 

var auth = require("../Model/auth"); // use this to do stuff on db
var path = require("path");

// ==========================================================
// do stuff with data  from data base. 

const loginController = {
	login: function (req, res){
		var username = req.body.username;
		var password = req.body.password;
		var errorMsg = "Incorrect Username and/or Password!"
		if (username && password) {
			auth.selectWhere("username", [username], function(results){
				if(results.length>0){ // if username exists - check pw 
					bcrypt.compare(password, results[0].userPassword, function(err, compareResult) {
						if(compareResult){
							req.session.loggedin = true;
							req.session.username = username;
							res.send(true);
						}
						else{ //if pw is incorrect send error 
							res.send(errorMsg);
						}
					});
				} else { // if no users exist - send error 
					res.send(errorMsg)
				}
			})
		}else { // if username and pw sent is null 
			res.send(errorMsg);
			res.end();
		}
	},

	registerUser: function (req, res){
		var username = req.body.username;
		var email = req.body.email;
		var password = req.body.password;
		auth.selectWhereOR(["username", "email"], [username, email], function(results){
			if(results.length > 0){
				//we got a user... dont register. 
				res.send("User already exists.")
			}
			else{
				// - then insert data to db. 
				bcrypt.genSalt(saltRounds, function(err, salt){
					bcrypt.hash(password, salt, function(err, hash){
						console.log(hash);
						// insert to database 
						auth.createUser(["username","userPassword","email"],[username, hash, email], function(results){
							// login the user. 
							req.session.loggedin = true;
							req.session.username = username;
							res.send(results);
						})
					})
				})
			}
			res.end();
		})
	},

	logout: function (req, res){
		req.session.destroy(function(err){
			if(!err){
				res.send(true) // send true if success
			}else{
				res.send(err);
			}
			res.end();
		})
	}

}

module.exports = loginController;