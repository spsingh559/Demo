module.exports = function(options) {
  const gameId = options.gameId;
  const playerId = options.playerId;

  // Bootstrap
  // Listen to broadcast
  this.add('role:gameplay,gameId:'+gameId+',cmd:nextQuestion', function(msg, respond) {
    this.emit('nextQuestion',msg);
    respond(null, {response: 'received'});
    respondQuestion.bind(this)();
  });
  this.use('redis-transport');
  this.listen({type: 'redis', pin: 'role:gameplay,gameId:'+gameId+',cmd:*'});

  // ping
  this.start = function() {
    this.act('role:gameplay,gameId:'+gameId+',player:'+playerId+',cmd:ping', function(err, response) {
      if(err) { /* Handle error! */ }
    });
  };

  // Setup Response Channel
  this.client({type: 'redis', pin: 'role:gameplay,gameId:'+gameId+',player:'+playerId+',cmd:*'});
  this.ready(this.start);

  function respondQuestion() {
    const sendResponse = {response: Math.floor(Math.random()*4)};
    this.emit('responseSent',sendResponse);
    this.act('role:gameplay,gameId:'+gameId+',player:'+playerId+',cmd:respond', sendResponse, function(err, response) {
      if(err) { /* Handle Error! */ }
      this.emit('correctResponseReceived',response);
    }.bind(this));
  }
}
