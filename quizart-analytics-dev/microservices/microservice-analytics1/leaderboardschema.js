var mongoose = require('mongoose');
var Schema=mongoose.Schema;

leaderboard = mongoose.Schema({
    	"topicId": String,
		"favTopics":[mongoose.Schema.Types.Mixed] 
});

module.exports = mongoose.model('Leaderboard', leaderboard,'Leaderboard');
