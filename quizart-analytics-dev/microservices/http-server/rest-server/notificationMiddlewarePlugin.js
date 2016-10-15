exports = module.exports = function(playerId,socket) {
  
var self = this;

self.playerId = playerId;
self.socket = socket;


console.log(playerId+' playerId');
console.log(socket+' socket');

const seneca = require('seneca');

const notificationServer = seneca();

notificationServer.add('role:notification,playerId:'+playerId+'cmd:receive',function(msg, callback) {
   console.log(msg.msg);
  // console.log('notification message'+notificationdata.msg)
  console.log("Inside Subscriber");
  // socket.emit('NoticeSent','success');
  return callback(null,{response: 'notification received on server'});
});

notificationServer.use('redis-transport');
notificationServer.listen({type:'redis', pin: 'role:notification,playerId:'+playerId+'cmd:*',host:'172.23.238.251'});

  }
