var mongoose = require('mongoose');
var Schema=mongoose.Schema;

gamesplayedschema = mongoose.Schema({
		"userId":String,
    	"count": Number,
    	"gamesplayed":Number
});

module.exports = mongoose.model('Gamesplayed', gamesplayedschema,'gamesPlayed');
