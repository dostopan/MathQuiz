var mongoose = require('mongoose');
require('./database/userSchema.js');
var User = mongoose.model('User');

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