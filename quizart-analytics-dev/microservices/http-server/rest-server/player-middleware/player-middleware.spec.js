const should = require('should');
const seneca = require('../test/seneca');
const async = require('async');
const EventEmitter = require('events');

const gameProvisionerPlugin = require('gameplay-microservice');

describe('Player Middleware', function() {
  const gameProvisioner = seneca();
  const PlayerMiddleware = require('./index');

  const socket = new EventEmitter();

  const playerId = 'playerId' + Math.random() * 213123123;

  const playerMiddleware = new PlayerMiddleware(playerId, socket);

  const topicId = 'playerId' + Math.random() * 23434131;

  before(function(done) {
    async.parallel([
        function(callback) {
          gameProvisioner.use(gameProvisionerPlugin, {playersPerGame: 1, generateQuestions: generateQuestions});
          gameProvisioner.ready(callback);
        }, function(callback) {
          playerMiddleware.ready(callback);
        }
      ], done);
  });

  it('Player plays a single-player game', function(done) {
    var currQuestionIndex = -1;
    socket.on('queued', function(msg) {
      msg.should.have.property('response');
      msg.response.should.be.exactly('queued');
      doDone();
    });

    socket.on('gameId', function(msg) {
      msg.should.have.property('topicId');
      msg.topicId.should.be.exactly(topicId);
      msg.should.have.property('gameId');
      doDone();
    });

    socket.on('response', function(msg) {
      msg.should.have.property('correctResponse');
      doDone();
    });

    playerMiddleware.queue(topicId);

    socket.on('nextQuestion', function(msg) {
      currQuestionIndex++;
      msg.should.have.property('question');
      doDone();
      respondToQuestion();
    });

    function respondToQuestion() {
      playerMiddleware.respond(2);
    }

    var doneCount = 0;
    function doDone() {
      if(++doneCount === 22) { done(); }
    }
  });

  after(function(done) {
    async.parallel([
        function(callback) { gameProvisioner.close(callback); },
        function(callback) { playerMiddleware.close(callback); }
      ], done);
  });
});

function generateQuestions() {
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
