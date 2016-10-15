var mongoose = require('mongoose'),

topic_info = mongoose.Schema({
    	"gamesPlayed": Number,
      "wins": Number,
      "loss": Number,
      "userId": String,
      "experience":Number
});


module.exports = mongoose.model('Topic', topic_info,'topic');
