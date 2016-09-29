var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var apiRoutes = express.Router();

var jwt = require('jsonwebtoken');
var config = require('../config.js');

require('./database/userSchema.js');
var User = mongoose.model('User');
require('./database/questionSchema.js');
var Question = mongoose.model('Question');
require('./database/quizSchema.js');
var Quiz = mongoose.model('Quiz');
require('./database/teamSchema.js');
var Team = mongoose.model('Team');
//console.log(Quiz);

var port = process.env.PORT || 8080;
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Hello from databse.');
  // we're connected!
});
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('../app/'));

app.use(morgan('dev'));


app.use('/api', apiRoutes);
var controller = require('./controller');

apiRoutes.post('/saveuser', controller.saveUser);

apiRoutes.post('/authenticate', function(req, res) {
	User.findOne({
		email : req.params.email
	}, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.'});
		} else if (user) {
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.'});
			} else {
					var token = jwt.sign(user, app.get('superSecret'), {
						expiresIn: 86400
					});

					res.status(200).json({
						success: true,
						message: 'Enjoy your token!',
						token: token
					});
				}
			}
		console.log(token);
		});
	});

apiRoutes.post('/savequestion', controller.saveQuestion);
apiRoutes.get('/questionList', controller.getAllQuestions);
apiRoutes.get('/quizList', controller.getAllQuizzes);
apiRoutes.post('/savequiz', controller.saveQuiz);
apiRoutes.get('/usersList', controller.getAllUsers);
apiRoutes.get('/usersList/:id', controller.getUserById);

//kontrolna ruta za autentifikaciju
apiRoutes.use(function(req, res, next) {
	if (req.originalUrl != '/api/saveuser') {
		var token = req.body.token 
					|| req.query.token
					|| req.headers['x-access-token'];

		if (token) {
			console.log(token);
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token.' });
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided'
			});
		}
	} else {
		next();
	}
});

var path = require('path');
var rootPath = path.normalize(__dirname + '/../');
console.log(__dirname);

app.use('/', function(req, res){
	res.sendFile(rootPath + '/app/index.html');
});

apiRoutes.post('/loginuser', controller.loginUser);

apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});


app.listen(port);
console.log("Listening on port " + 8080 + ' ... ');