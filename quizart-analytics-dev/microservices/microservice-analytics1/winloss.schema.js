var mongoose = require('mongoose');
var Schema=mongoose.Schema;

winloss = mongoose.Schema({
    	"userId": String,
		"status":[mongoose.Schema.Types.Mixed] 
});

module.exports = mongoose.model('Winloss', winloss,'win_loss');
