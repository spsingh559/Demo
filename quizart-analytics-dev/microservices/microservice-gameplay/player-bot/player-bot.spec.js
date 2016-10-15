const seneca = require('../test/seneca');
const async = require('async');
const should = require('should');

describe('Gameplay with Bot', function() {
  const gameManager = seneca();
  const gameId = Math.random()*3471232;
  const bot1 = seneca();
  const bot2 = seneca();
  const bot1Id = 'bot1Id' + Math.random()*211231231;
  const bot2Id = 'bot2Id' + Math.random()*123123141;

  const questionTime = 200;

  const questions = getQuestions();

  before(function(done) {
    gameManager.use('../game-manager',{gameId: gameId, players: [bot1Id,bot2Id], questions: questions, questionTime: questionTime});
    gameManager.ready(done);
  });

  it('Player Answers, Next Question sent', function(done) {
    this.timeout(5000);
    bot1.use('player-bot', {gameId: gameId, playerId: bot1Id});
    bot2.use('player-bot', {gameId: gameId, playerId: bot2Id});

    var doneCount = 0;
    var nextQuestionCount = 0;
    var responseSentCount = 0;
    var correctResponseReceivedCount = 0;

    bot1.on('nextQuestion', function(msg) {
      ++nextQuestionCount;
      msg.should.have.property('question');
      msg.question.should.be.exactly(questions[doneCount].question);
      msg.should.have.property('options');
      msg.should.have.property('correctResponseIndex');
      msg.correctResponseIndex.should.be.exactly(questions[doneCount].correctResponseIndex);
      msg.should.have.property('imageUrl');
      msg.imageUrl.should.be.exactly(questions[doneCount].imageUrl);
    });

    bot1.on('responseSent', function(msg) {
      ++responseSentCount;
      msg.should.have.property('response');
    });

    bot1.on('correctResponseReceived', function(msg) {
      ++correctResponseReceivedCount;
      msg.should.have.property('correctResponse');
      msg.correctResponse.should.be.exactly(doneCount%4);
      doDone();
    });

    function doDone() {
      if(++doneCount === 10) {
        nextQuestionCount.should.be.exactly(10);
        responseSentCount.should.be.exactly(10);
        correctResponseReceivedCount.should.be.exactly(10);
        done();
      };
    }
  });

  after(function(done) {
    async.parallel([
        function(callback) {
          bot1.close(callback);
        }, function(callback) {
          bot2.close(callback);
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
