var mongoose = require('mongoose')
	Schema = mongoose.Schema;

var questionsSchema = new mongoose.Schema({
	question : {
		type : String,
		required : true
	},
	answers : {
		type : [],
		required : true
	},
	rightAnswer : {
		type : Schema.Types.Mixed,
		required : true
	},
	fieldName : String,
	points : {
		type : Number,
		required : true
	},
	duration : Number,
	admin : {
		type : String,
		ref : 'User'
	},
	date : {
		type: Date,
		default: Date.now
	}
});

var Question = mongoose.model('Question', questionsSchema);
module.exports = Question;