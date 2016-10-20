exports = module.exports = function(lobbyId,socket) {
  
	var self = this;

	self.lobbyId = lobbyId;
	self.socket = socket;

	console.log('Inside Middleware : ' + lobbyId);

	const seneca = require('seneca');

	const lobbyServer = seneca();

	lobbyServer.add('role:lobbySub,lobbyId:'+lobbyId+',cmd:getPlayers',function(msg, callback) {
	   //console.log(msg.msg);
	  console.log('Inside Server Middleware');
	  socket.emit('updatePlayer', {data: 'Update it:by Middleware'});
	  return callback(null,{response: 'Requested all to update their Player List'});
	});

	lobbyServer.use('redis-transport');
	lobbyServer.listen({
		type:'redis',
		pin: 'role:lobbySub,lobbyId:'+lobbyId+',cmd:*',
		host:'172.23.238.251'
	});
}