const seneca = require('../test/seneca');
const should = require('should');
const async = require('async');

const gameProvisionerPlugin = require('.');

describe('Game Provisioner', function() {
  const gameProvisioner = seneca();
  const players = [];
  const topicId = 'topicId' + Math.random()*939272047;

  before(function(done) {
    async.series([
        function(callback) {
          gameProvisioner.use(gameProvisionerPlugin, {playersPerGame: 4, generateQuestions: generateQuestions});
          gameProvisioner.ready(callback);
        }, function(callback) {
          createPlayers(4).forEach(function(player) {
            players.push(player);
          });
          callback();
        }, function(callback) {
            async.each(players, function(player, callback) {
              player.microservice = seneca();
              const playerId = player.playerId;
              const playerMicroservice = player.microservice;

              playerMicroservice.add('role:queue,player:'+playerId+',cmd:ready',function(msg, respond) {
                playerMicroservice.emit('ready', {gameId:msg.gameId,player:playerId}, function(err, response) {
                });
                return respond(null, {response: 'okay'});
              });

              playerMicroservice.use('redis-transport');
              playerMicroservice.client({type: 'redis', pin: 'role:provisioner,cmd:*'});
              playerMicroservice.listen({type: 'redis', pin: 'role:queue,player:' + playerId + ',cmd:*'});
              playerMicroservice.ready(callback);
            }, callback);
        }
      ], done);
  });

  it('Three Players Join', function(done) {
    const firstFewPlayers = players.slice(0,players.length-1);
    async.each(firstFewPlayers, function(player, callback) {
      const playerId = player.playerId;

      const microservice = player.microservice;

      microservice.act('role:provisioner,cmd:queue',{topicId: topicId, playerId: playerId}, function(err, response) {
        if(err) { return callback(err); }
        response.should.have.property('response');
        response.response.should.be.exactly('queued');
        callback();
      });
    }, done);
  });

  it('Game Starts when fourth player joins', function(done) {
    this.timeout(15000);

    const lastPlayerId = players[players.length-1].playerId;

    const microservice = players[players.length-1].microservice;

    microservice.on('ready', function(msg,callback) {
      msg.should.have.property('gameId');
      done();
    });

     microservice.act('role:provisioner,cmd:queue',{topicId: topicId, playerId: lastPlayerId}, function(err, response) {
        if(err) { done(err); }
        response.should.have.property('response');
        response.response.should.be.exactly('queued');
      });

      //done();
  });

  after(function(done) {
    async.parallel([
        function(callback) {
          // gameProvisioner.destroy(gameProvisioner.close.bind(this,callback));
          gameProvisioner.emit('doDestroy',function() {
            gameProvisioner.close(callback);
          });
        },
        function(callback) {
          async.each(players, function(player, callback) {
            var playerMicroservice = player.microservice;
            playerMicroservice.close(callback);
          }, callback);
        }
      ], done);
  });

  function createPlayers(noOfPlayersToCreate) {
    const players = [];
    for(let i=0; i<noOfPlayersToCreate; i++) {
      players.push({
        playerId: 'player' + i + '-' + Math.random() * 2341231234123
      });
    }
    return players;
  }

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
});
