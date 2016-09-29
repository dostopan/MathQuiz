var mongoose = require('mongoose')
	Schema = mongoose.Schema;

var quizzesSchema = new mongoose.Schema({
	quizQuestions : {
		type : Array , "default" : []
	},
	quizName : {
		type : String,
		required : true
	},
	admin : {
		type : Schema.Types.ObjectId,
		ref : 'User'
	},
	date : {
		type : Date,
		default : Date.now
	}
});

var Quiz = mongoose.model('Quiz', quizzesSchema);
module.exports = Quiz;