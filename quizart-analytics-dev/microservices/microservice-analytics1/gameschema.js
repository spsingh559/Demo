var mongoose = require('mongoose'),

game_info = mongoose.Schema({
    	"user_id": String,
      "game_id": Number,
      "topic_id": String,
      "time": String,
      "rank": Number,
      "status":String,
      "previous_Elo": Number,
      "current_Elo": Number
});


module.exports = mongoose.model('Game', game_info,'game_info');
