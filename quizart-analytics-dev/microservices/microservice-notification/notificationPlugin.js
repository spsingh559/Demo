 
var mongoose = require('mongoose')

var bcrypt = require('bcrypt');

exports = module.exports = function(options) {
  const connection = mongoose.createConnection(options.mongoUrl);

  connection.on('connected', function() {
    console.log('Mongoose connection open to: ' + options.mongoUrl);
  });

  connection.on('error', function() {
    console.error('Mongoose connection error: ' + options.mongoUrl);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose connection disconnected due to app SIGINT.');
    });
  });

  const notificationModel = connection.model('NotificationSchema', require('./notification.schema.js'));

  this.add('role:notification,cmd:create', function(msg, respond) {
    console.log("======REDIS=========");
    console.log(msg);
   
    return respond(null, {msg: 'notification created'});
  });

  this.add('role:notification,cmd:update', function(msg, respond) {
    console.log("======REDIS=========");
    console.log(msg);
   
    return respond(null, {msg: 'notification updated'});
  });

  this.add('role:notification,cmd:getAll', function(msg, respond) {

     return notificationModel.find({NotificationTargetId: msg.userId}, function(err, retrievedAccount) {
      if(err) { return respond(err); }
      if(retrievedAccount.length === 0) 
      	{ return respond(null,{response:'fail'});
  		}
      	else{
      		return respond(null,{response:'success'});
      }
  });
}