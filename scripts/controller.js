var mongoose = require('mongoose');
require('./database/userSchema.js');
var User = mongoose.model('User');
require('./database/questionSchema.js');
var Question = mongoose.model('Question');
require('./database/quizSchema.js');
var Quiz = mongoose.model('Quiz');

module.exports.saveUser = function(req, res) {
	var data = req.body; //poslao klijent
	console.log(data);

	console.log(req.route.path);
	var user = new User(data);

	user.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully.');
		res.json({ success: true});
	});
}

module.exports.loginUser = function(req, res) {
	var data = req.body;
	var user = User.findOne({ email: data.email });
	var token = $window.localStorage.getItem("token");
	user.save(function(err) {
		if (err) throw err;

		res.json({ success: true});
	});
}

module.exports.getAllUsers = function(req, res) {
	User.find({}, function(err, users) {
	var userMap = {};

	users.forEach(function(user) {
		userMap[user._id] = user;
	});
	res.setHeader('Content-Type', 'application/json');
	res.send(userMap);
	});
}

module.exports.getUserById = function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(tasks[req.params._id]);
}

module.exports.saveQuestion = function(req, res) {
	var data = req.body;
	console.log(data);

	var question = new Question(data);

	question.save(function(err) {
		if (err) throw err;

		console.log('Question saved successfully.');
		res.json({ success: true});
	});
}

module.exports.getAllQuestions = function(req, res) {
	Question.find({}, function(err, questions) {
	var questionMap = {};

	questions.forEach(function(question) {
		questionMap[question._id] = question;
	});
	res.setHeader('Content-Type', 'application/json');
	res.send(questionMap);
	});
}

module.exports.saveQuiz = function(req, res) {
	var data = req.body;
	console.log(data);

	var quiz = new Quiz(data);

	quiz.save(function(err) {
		if (err) throw err;

		console.log('Quiz saved successfully!');
		res.json({ success: true });
	});
}