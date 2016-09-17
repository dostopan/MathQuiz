var mongoose = require('mongoose')
	Schema = mongoose.Schema;

var usersSchema = new mongoose.Schema({
	email : {
		type : String,
		required : true,
		unique : true
	},
	password : String,
	admin : Boolean,
	hash : String,
	salt : String,
	joined :  Date
});

var User = mongoose.model('User', usersSchema);
module.exports = User;