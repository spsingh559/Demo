const seneca = require('seneca');

const PlayerMiddleware = function(playerId, socket) {
  var isReady = false;
  const readyFunctions = [];

  var gameplayMicroservice = null;
  var gameId = null;

  const provisionerClient = seneca({log: 'test'});
  provisionerClient.use('redis-transport');
  provisionerClient.client({type: 'redis', pin: 'role:provisioner,cmd:*'});
  provisionerClient.ready(function() {
    isReady = true;
    readyFunctions.forEach(function(readyFunction) {
      readyFunction();
    });
  });

  this.queue = function(topicId) {
    const receiveGameIdServer = seneca({log: 'test'});
    console.log('Queueing Player');
    receiveGameIdServer.add('role:queue,player:'+playerId+',cmd:ready', function(msg, respond) {
      const gameId = msg.gameId;
      console.log('4. MIDDLEWARE RECEIVED GAMEID: ' + gameId);
      respond(null, {response: 'okay'});
      socket.emit('gameId',{gameId: gameId,topicId: topicId});
      receiveGameIdServer.close();

      startGame(gameId);
    });

    receiveGameIdServer.use('redis-transport');
    receiveGameIdServer.listen({type: 'redis', pin:'role:queue,player:' + playerId + ',cmd:*'});
    receiveGameIdServer.ready(function() {
      provisionerClient.act('role:provisioner,cmd:queue',{topicId: topicId, playerId: playerId}, function(err, response) {
        if(err) { /* Handle Error */ }
        console.log('Player Queued');
        socket.emit('queued',response);
      });
    });
  }

  this.ready = function(readyFunction) {
    if(isReady) {
      readyFunction();
    } else {
      readyFunctions.push(readyFunction);
    }
  }

  this.respond = function(response) {
    console.log('MIDDLEWARE RESPONSE RECEIVED: ', response);
    gameplayMicroservice.act('role:gameplay,gameId:'+gameId+',player:'+playerId+',cmd:respond',{response: response}, function(err, response) {
      if(err) { /* Handle Error */ }
      socket.emit('response',response);
    });
  }

  this.close = function() {
    if(provisionerClient) { provisionerClient.close(); }
    if(gameplayMicroservice) { gameplayMicroservice.close(); }
  }

  function startGame(startGameId) {
    gameId = startGameId;
    gameplayMicroservice = seneca();
    gameplayMicroservice.add('role:gameplay,gameId:'+startGameId+',cmd:nextQuestion',function(msg, respond) {
      console.log('9. NEXT QUESTION RECEIVED',msg);
      socket.emit('nextQuestion', msg);
      respond(null, {msg: 'ping'});
    });
    gameplayMicroservice.add('role:gameplay,gameId:'+startGameId+',cmd:leaderboard',function(msg, respond) {
      socket.emit('leaderboard',msg);
      respond(null, {msg: 'ok'});
    });
    gameplayMicroservice.add('role:gameplay,gameId:'+startGameId+',cmd:gameComplete',function(msg, respond) {
      console.log('10. GAME COMPLETED with LEADERBOARD: ', msg.leaderboard);
      socket.emit('gameComplete',msg.leaderboard);
    });
    gameplayMicroservice.use('redis-transport');
    gameplayMicroservice.listen({type: 'redis', pin: 'role:gameplay,gameId:'+startGameId+',cmd:*'});
    gameplayMicroservice.client({type:'redis',pin:'role:gameplay,gameId:'+startGameId+',player:'+playerId+',cmd:*'});
    gameplayMicroservice.ready(function() {
      console.log('5. MIDDLEWARE IS ABOUT TO PING');
      gameplayMicroservice.act('role:gameplay,gameId:'+startGameId+',player:'+playerId+',cmd:ping', function(err, response) {
        if(err) { /* Handle Error */ }
        console.log('PONG RECEIVED');
        socket.emit('gameId',startGameId);
      });
    });
  }
}

module.exports = PlayerMiddleware;
