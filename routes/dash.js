var express = require('express');
var gravatar = require('gravatar');
var router = express.Router();

	var returnRouter = function(parse){
	var Parse = parse;
	var parseLogin = require('../modules/parse-login.js')(Parse);
	var parseRegister = require('../modules/parse-register.js')(Parse);
	var parseAuthCheck = require('../modules/parse-check.js')(Parse);


	router.get('/test', parseAuthCheck, (req, res) => {
		var currentUser = req.session.user;
		var imgUrl = gravatar.url(currentUser.email, {s: '200', r: 'pg', d: 'retro'});
		res.render('dash/index',{
			pageTitle: "School Management System",
			action: "home",
			isAuthenticated: true,
			user: currentUser,
			gravatar: imgUrl
		});
	});

	router.use('/', parseAuthCheck, express.static('app'));

	router.get('/home', parseAuthCheck, (req, res) =>{
		var currentUser = req.session.user;
		var imgUrl = gravatar.url(currentUser.email, {s: '200', r: 'pg', d: 'retro'});
		res.render('angular/main',{
			pageTitle: "School Management System",
			action: "home",
			isAuthenticated: true,
			user: currentUser,
			gravatar: imgUrl
		});
	});

	router.get('/users/current', parseAuthCheck, (req, res) =>{
		res.json(req.session.user);
	});

	router.use('/students', parseAuthCheck, require('./students/students.controller')(Parse));



	return router;
}
module.exports = returnRouter;