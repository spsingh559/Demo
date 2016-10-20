var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
	NotificationId:{type:Number},
	NotificationOwnerId:{type:String},
	NotificationTargetId:{type:String},
	NotificationOwnerPic:{type:String},
	NotificationTitle:{type:String},
	NotificationSubTitle:{type:String},
	DateAndTime: {type:Date},
	NotificationStatus:{type:Boolean},
	notificationStatustext:{type:String},
	notificationResultStatus:{type:Boolean}
	
});

module.exports = mongoose.model('notifications', NotificationSchema);

// var mongoose = require('mongoose');

// var userCounters = mongoose.model('userCounters', { userId: String, consLogin: Number, nOfWin: Number, nOfConsWin: Number, avgResTimeCrctCurrentGame: Number, nOfUniqTopicPlayed: Number, nOfGamePlayed: Number, nOfCrctResCurGame: Number, nOfWinForATopic: Number},'userCounters');

// module.exports = userCounters;