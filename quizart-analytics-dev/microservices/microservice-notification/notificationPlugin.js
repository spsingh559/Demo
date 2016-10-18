var mongoose = require('mongoose');

module.exports = function(options){

	 mongoose.connect(options.mongoUrl);
  
  this.add('role:notification,cmd:getAllNotification', function(msg, respond) {
    console.log("======Notification Service=========");
    
    return respond(null, {msg: "Notification Service"});
  });
}






 
// var mongoose = require('mongoose');

// exports = module.exports = function(options) {
//   const connection = mongoose.createConnection(options.mongoUrl);

//   connection.on('connected', function() {
//     console.log('Mongoose connection open to: ' + options.mongoUrl);
//   });

//   connection.on('error', function() {
//     console.error('Mongoose connection error: ' + options.mongoUrl);
//   });

//   process.on('SIGINT', function() {
//     mongoose.connection.close(function() {
//       console.log('Mongoose connection disconnected due to app SIGINT.');
//     });
//   });

//   const notificationModel = connection.model('NotificationSchema', require('./notification.schema.js'));

//   this.add('role:notification,cmd:createNoti', function(msg, respond) {
//     console.log("======REDIS=========");
//     console.log(msg);
//     return respond(null, {msg: 'notification created'});
//   });

// //   this.add('role:notification,cmd:update', function(msg, respond) {
// //     return notificationModel.update(
// //     	{s
// //     	NotificationTargetId:msg.id
// //     	},
// // 	    {$set:{
// // 	    	NotificationStatus:msg.status,
// // 	    	notificationStatustext:msg.statusText,
// // 	    	notificationResultStatus:msg.resultStatus
// // 	    },function(err, data) {
// //       if(err) { return respond(err); }
// //       	else{
// //       		return respond(null,{response:'updated'});
// //       }
// //   });

// //   this.add('role:notification,cmd:getAll', function(msg, respond) {

// //      return notificationModel.find({NotificationTargetId: msg.userId}, function(err, data) {
// //       if(err) { return respond(err); }
// //       if(data.length === 0) 
// //       	{ return respond(null,{response:'no data found'});
// //   		}
// //       	else{
// //       		return respond(null,{response:data});
// //       }
// //   });
//  }