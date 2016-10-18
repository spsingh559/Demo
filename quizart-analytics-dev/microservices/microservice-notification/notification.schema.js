var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
	_id: {type:String},
	NotificationId:{type:String},
	NotificationOwnerId:{type:String},
	NotificationTargetId:{type:String},
	NotificationOwnerPic:{type:String},
	NotificationTitle:{type:String},
	NotificationSubTitle:{type:String},
	DateAndTime: {type:Date},
	NotificationStatus:{type:Boolean},
	notificationStatus:{type:Boolean},
	notificationResultStatus:{type:Boolean}
});

exports = module.exports = mongoose.model('NotificationSchema', NotificationSchema);
