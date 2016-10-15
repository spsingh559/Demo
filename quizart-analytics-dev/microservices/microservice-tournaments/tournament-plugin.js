var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

exports = module.exports = function(options) {
  const connection = mongoose.createConnection(options.mongoUrl);

  connection.on('connected', function() {
    console.log('Mongoose connection open to: ' + options.mongoUrl);
  });

  connection.on('error', function() {
    console.error('Mongoose connection error: ' + options.mongoUrl);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose connection disconnected due to app SIGINT.');
    });
  });

  const Tournament = connection.model('Knockout', require('./tournament.schema'));

  this.add('role:tournaments,cmd:dangerouslyDeleteAllTournaments', function(msg, respond) {
    return Tournament.remove({}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });

  this.add('role:tournaments,cmd:create', function(msg, respond) {
    return Tournament.create(msg, function(err, createdTournament) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: createdTournament});
    });
  });

  this.add('role:tournaments,cmd:retrieveById', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

  this.add('role:tournaments,cmd:retrieveAll', function(msg, respond) {
    Tournament.find({}, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

  this.add('role:tournaments,cmd:retrieveActive', function(msg, respond) {
    Tournament.find({isComplete: false}, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

  this.add('role:tournaments,cmd:registerPlayerFirstLevel', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      retrievedTournament.levels[0].registeredPlayers.push({userId: msg.userId});
      Tournament.update(
         { _id: retrievedTournament._id },
         { $set: retrievedTournament },
         function(err,res) {
           if(err) {
             console.error('ERROR: ', err);
             return;
           }
           return respond(null, {response: 'success', entity: retrievedTournament});
         }
      );
    });
  });

  this.add('role:tournaments,cmd:registerPlayersHigherLevels', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      var levels = retrievedTournament.levels;
      var currentLevel = -1;
      for(var i=0;i<levels.length;i++) {
        if(levels[i].active=='yes') {
          currentLevel = i;
          break;
        }
      }

      var leaderboard = retrievedTournament.levels[currentLevel-1].leaderboard;
      console.log('registerPlayersHigherLevels'+JSON.stringify(retrievedTournament));
      console.log(leaderboard);
      var arr = [];
      for(var i=0;i<leaderboard.length/2;i++) {
        console.log('registerPlayersHigherLevels'+leaderboard[i]);
        retrievedTournament.levels[currentLevel].registeredPlayers.push({userId: leaderboard[i].userId});
      }
      console.log('registerPlayersHigherLevels'+JSON.stringify(retrievedTournament));
      Tournament.update(
         { _id: retrievedTournament._id },
         { $set: retrievedTournament },
         function(err,res) {
           if(err) {
             console.error('ERROR: ', err);
             return;
           }
           return respond(null, {response: 'success', entity: retrievedTournament});
         }
      );
    });
  });

  this.add('role:tournaments,cmd:updateWinners', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      var levels = retrievedTournament.levels;
      var currentLevel = -1;
      for(var i=0;i<levels.length;i++) {
        if(levels[i].active=='yes') {
          currentLevel = i;
          break;
        }
      }

      console.log('currentLevel  is: '+currentLevel);
      console.log('currentLevel  is: '+JSON.stringify(retrievedTournament));
      for(var i=0;i<retrievedTournament.levels[currentLevel].games.length;i++) {
        var arr = retrievedTournament.levels[currentLevel].games[i];
        for(var j=0;j<arr.length;j++) {
          retrievedTournament.levels[currentLevel].leaderboard.push(arr[j]);
        }
      }
      retrievedTournament.levels[currentLevel].leaderboard.sort(
        function(a, b) {
          return b.score - a.score;
        }
      )
      if((currentLevel+1)==retrievedTournament.noOfLevels) {
        retrievedTournament.isComplete = true;
        retrievedTournament.levels[currentLevel].active='no';
      } else {
        retrievedTournament.levels[currentLevel+1].active='yes';
        retrievedTournament.levels[currentLevel].active='no';
      }

      Tournament.update(
         { _id: retrievedTournament._id },
         { $set: retrievedTournament },
         function(err,res) {
           if(err) {
             console.error('ERROR: ', err);
             return;
           }
           return respond(null, {response: 'success', entity: retrievedTournament});
         }
      );
    });
  });

  this.add('role:tournaments,cmd:updateTournamentLeaderboard', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      var levels = retrievedTournament.levels;
      var currentLevel = -1;
      for(var i=0;i<levels.length;i++) {
        if(levels[i].active=='yes') {
          currentLevel = i;
          break;
        }
      }
      console.log('Level is: '+currentLevel);
      console.log(JSON.stringify(msg.leaderboard));
      console.log(JSON.stringify(retrievedTournament));
      var leaderboard = msg.leaderboard;
      var games  = retrievedTournament.levels[currentLevel].games;
      games.push(leaderboard);
      retrievedTournament.levels[currentLevel].games = games;
      console.log(JSON.stringify(retrievedTournament));
      /**retrievedTournament.save(function (err) {
        if(err) {
            console.error('ERROR: ', err);
        }
      });*/

      Tournament.update(
         { _id: retrievedTournament._id },
         { $set: retrievedTournament },
         function(err,res) {
           if(err) {
             console.error('ERROR: ', err);
             return;
           }
           return respond(null, {response: 'success', entity: retrievedTournament});
         }
      );
    });
  });

};
