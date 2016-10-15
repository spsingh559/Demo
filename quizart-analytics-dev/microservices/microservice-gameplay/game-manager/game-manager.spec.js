const seneca = require('../test/seneca');
const async = require('async');
const should = require('should');

describe('Gameplay', function() {
  const gameManager = seneca();
  const gameId = Math.random()*3471232;
  const player = seneca();
  const playerId = 'playerId' + Math.random()*211231231;

  const questionTime = 200;

  const questions = getQuestions();

  before(function(done) {
    async.parallel([
        function(callback) {
          gameManager.use('game-manager',{gameId: gameId, players: [playerId], questions: questions, questionTime: questionTime});
          gameManager.ready(callback);
        }, function(callback) {
          player.use('redis-transport');
          player.client({type: 'redis', pin: 'role:gameplay,gameId:'+gameId+',player:'+playerId+',cmd:*'});
          player.ready(callback);
        }
      ],done);
  });

  it('Player Joins, Game Starts', function(done) {
    player.add('role:gameplay,gameId:'+gameId+',cmd:nextQuestion', function(msg, respond) {
      msg.should.have.property('question');
      msg.question.should.be.exactly(questions[0].question);
      msg.should.have.property('options');
      msg.should.have.property('correctResponseIndex');
      msg.correctResponseIndex.should.be.exactly(questions[0].correctResponseIndex);
      msg.should.have.property('imageUrl');
      msg.imageUrl.should.be.exactly(questions[0].imageUrl);
      doDone();
    });

    player.listen({type: 'redis',pin:'role:gameplay,gameId:'+gameId+',cmd:*'});

    var dones = 0;

    player.act('role:gameplay,gameId:' + gameId + ',player:'+playerId+',cmd:ping', function(err, response) {
      if(err) { done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('pong');
      doDone();
    });

    function doDone() {
      if(++dones === 2) { done(); }
    }
  });

  it('Player Answers, Next Question sent', function(done) {
    var doneCount = 0;

    doAct();

    player.add('role:gameplay,gameId:'+gameId+',cmd:nextQuestion', function(msg, respond) {
      msg.should.have.property('question');
      msg.question.should.be.exactly(questions[doneCount].question);
      msg.should.have.property('options');
      msg.should.have.property('correctResponseIndex');
      msg.correctResponseIndex.should.be.exactly(questions[doneCount].correctResponseIndex);
      msg.should.have.property('imageUrl');
      msg.imageUrl.should.be.exactly(questions[doneCount].imageUrl);
      doAct();
    });

    function doAct() {
      player.act('role:gameplay,gameId:'+gameId+',player:'+playerId+',cmd:respond',{response: 2}, function(err, response) {
        if(err) { return done(err); }
        response.should.have.property('correctResponse');

        response.correctResponse.should.be.exactly(doneCount%4);
        doDone();
      });
    }

    function doDone() {
      if(++doneCount === 10) done();
    }
  });

  after(function(done) {
    async.parallel([
        function(callback) {
          player.close(callback);
        }, function(callback) {
          gameManager.close(callback);
        }
      ],done);
  });

  function getQuestions() {
    var questions = [];
    for(var i=0; i<10;i++) {
      questions.push({
        question: 'Question '+i+' ?',
        options: ['A'+i,'B'+i,'C'+i,'D'+i],
        correctResponseIndex: i%4,
        imageUrl: ''
      });
    }
    return questions;
  };
});
