var mongoose = require('mongoose')
	Schema = mongoose.Schema;

var usersSchema = new mongoose.Schema({
	name : String,
	email : {
		type : String,
		required : true
	},
	password : String,
	admin : Boolean,
	hash : String,
	salt : String,
	joined : { 
		type : Date
	}
});

var User = mongoose.model('User', usersSchema);
module.exports = User;