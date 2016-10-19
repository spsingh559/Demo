var mongoose = require('mongoose');
// const notificationSchema=require('./notification.schema.js');
module.exports = function(options){

var data1=[
{
      "id": 0,
      "NotificationId": 1,
      "NotificationOwnerId": 1001,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Friend Request",
      "NotificationSubTitle": "has send Friend request",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationStatustext": "You have Rejected",
      "notificationResultStatus": "NoStatus"
    },
    {
      "id": 1,
      "NotificationId": 2,
      "NotificationOwnerId": 1002,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Tournament Participation",
      "NotificationSubTitle": "has sent Invitation for Playing Tournament",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationStatustext": "You have Accepted",
      "notificationResultStatus": "NoStatus"
    },
    {
      "id": 2,
      "NotificationId": 3,
      "NotificationOwnerId": 1002,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Private Game Invitation",
      "NotificationSubTitle": "has sent Game invitation",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationResultStatus": "NoStatus",
      "notificationStatustext": "You have Accepted"
    },
    {
      "id": 3,
      "NotificationId": 4,
      "NotificationOwnerId": 1001,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Chat Invitation",
      "NotificationSubTitle": "has sent Chat Invitation",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationResultStatus": "NoStatus",
      "notificationStatustext": "You have Accepted"
    },
    {
      "id": 4,
      "NotificationId": 1,
      "NotificationOwnerId": 1001,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Friend Request",
      "NotificationSubTitle": "has send Friend request",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationStatustext": "You have Rejected",
      "notificationResultStatus": "NoStatus"
    },
    {
      "id": 5,
      "NotificationId": 2,
      "NotificationOwnerId": 1002,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Tournament Participation",
      "NotificationSubTitle": "has sent Invitation for Playing Tournament",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": false,
      "notificationStatustext": "You have Accepted",
      "notificationResultStatus": true
    },
    {
      "id": 6,
      "NotificationId": 3,
      "NotificationOwnerId": 1002,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Private Game Invitation",
      "NotificationSubTitle": "has sent Game invitation",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": false,
      "notificationResultStatus": false,
      "notificationStatustext": "You have Rejected"
    },
    {
      "id": 7,
      "NotificationId": 4,
      "NotificationOwnerId": 1001,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Chat Invitation",
      "NotificationSubTitle": "has sent Chat Invitation",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationResultStatus": "NoStatus",
      "notificationStatustext": "You have Rejected"
    },
    {
      "id": 8,
      "NotificationId": 1,
      "NotificationOwnerId": 1001,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Friend Request",
      "NotificationSubTitle": "has send Friend request",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationStatustext": "You have Rejected",
      "notificationResultStatus": "NoStatus"
    },
    {
      "id": 9,
      "NotificationId": 2,
      "NotificationOwnerId": 1002,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Tournament Participation",
      "NotificationSubTitle": "has sent Invitation for Playing Tournament",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationStatustext": "You have Rejected",
      "notificationResultStatus": "NoStatus"
    },
    {
      "id": 10,
      "NotificationId": 3,
      "NotificationOwnerId": 1002,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Private Game Invitation",
      "NotificationSubTitle": "has sent Game invitation",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationResultStatus": "NoStatus",
      "notificationStatustext": "You have Accepted"
    },
    {
      "id": 11,
      "NotificationId": 4,
      "NotificationOwnerId": 1001,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Chat Invitation",
      "NotificationSubTitle": "has sent Chat Invitation",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationResultStatus": "NoStatus",
      "notificationStatustext": "You have Rejected"
    }
];

  
  this.add('role:notification,cmd:getAllNotification', function(msg, respond) {
    console.log("======Notification Service=========");
    // console.log(data1);
    return respond(null, {msg: data1});
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