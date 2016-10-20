exports = module.exports = function(playerId,socket) {
  
  const seneca = require('seneca');
  const notificationServer = seneca();
  
  var self = this;
  self.playerId = playerId;
  self.socket = socket;


notificationServer.add('role:notification,playerId:'+playerId+',cmd:send',function(msg, callback) {
   // console.log(msg.msg);
  console.log("Inside Subscriber");
  socket.emit('connection', {status:true,message:'Notification received'});
  return callback(null,{response: 'notification sent  to player'+playerId});
});

notificationServer.use('redis-transport');
notificationServer.listen({type:'redis', pin: 'role:notification,playerId:'+playerId+',cmd:*',host:'172.23.238.251'});

  }
