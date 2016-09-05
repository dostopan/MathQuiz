var mongoose = require('mongoose')
	Schema = mongoose.Schema;

var quizzesSchema = new mongoose.Schema({
	quizName : {
		type : String,
		required : true
	},
	admin : {
		type : Schema.Types.ObjectId,
		ref : 'User'
	},
	quizQuestions : [{
		type : Schema.Types.ObjectId,
		ref : 'Question'
	}],
	date : {
		type : Date,
		default : Date.now
	}
});

var Quiz = mongoose.model('Quiz', quizzesSchema);
module.exports = Quiz;