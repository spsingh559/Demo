var mongoose = require('mongoose');
var Schema=mongoose.Schema;

filter = mongoose.Schema({
    	"userId": String,
		"favTopics":[mongoose.Schema.Types.Mixed] 
});

module.exports = mongoose.model('Filter', filter,'filtered_data');
