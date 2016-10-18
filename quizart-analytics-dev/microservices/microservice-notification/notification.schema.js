var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
	NotificationId:{type:String},
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

module.exports = mongoose.model('NotificationSchema', NotificationSchema);
