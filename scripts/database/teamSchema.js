var mongoose = require('mongoose')
	Schema = mongoose.Schema;

var teamsSchema = new mongoose.Schema({

});

var Team = mongoose.model('Team', teamsSchema);
module.exports = Team;