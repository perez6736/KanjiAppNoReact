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
		if (username && password) {
			// check db if username and pw exist  by calling doing a select on the users table
			// eventually i will need to encyrypt and compare.
			auth.selectWhereAND(["username", "userPassword"], [username, password], function(results){
				if(results.length > 0){ // if we get a result user exists in db. 
					console.log(results);
					req.session.loggedin = true;
					req.session.username = username;
					res.send(true);
					// eventually i will need to encyrypt and compare. 
				} else {
					res.send("Incorrect Username and/or Password!")
				}
				res.end();
			});
		}else {
			res.send('Please enter Username and Password!');
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
						res.send(hash);
					})
				})
			}
		})
	},

	logout: function (req, res){
		req.session.destroy(function(err){
			if(!err){
				res.send(true) // send true if success
			}else{
				res.send(err);
			}
		})
	}

}

module.exports = loginController;