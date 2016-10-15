const seneca = require('seneca');

module.exports = function(options) {
  const gameId = options.gameId;
  const playerId = options.playerId;

  this.add('role:gameplay,gameId:'+gameId+',cmd:nextQuestion', function(msg, respond) {

    console.log("QUESTION IS ",msg.question);
    console.log("OPTIONS ARE ",msg.options[0],msg.options[1],msg.options[2],msg.options[3]);
    answerQuestion.bind(this)();

  });

  this.use('redis-transport');
  this.listen({type: 'redis',pin:'role:gameplay,gameId:'+gameId+',cmd:*'});
  this.client({type: 'redis', pin: 'role:gameplay,gameId:'+gameId+',player:'+playerId+',cmd:*'});

  this.ready(this.start);

  this.start = function() {
  this.act('role:gameplay,gameId:' + gameId + ',player:'+playerId+',cmd:ping', function(err, response) {

      if(err){
        console.log('ERR ', err);
	    }
      console.log("RESPONSE IS ",response.response);
  });
  };


  function answerQuestion() {
    //console.log("waiting here!!")
    this.act('role:gameplay,gameId:'+gameId+',player:'+playerId+',cmd:respond',{response: 2}, function(err, response) {
      // if(err){
      //   console.log('ERR ', err);
      // }

      // console.log("Getting Errors!!");
      console.log("YOUR RESPONSE IS ",response.yourResponse);
      console.log("CORRECT RESPONSE IS ",response.correctResponse);
  });
  }
  
};
