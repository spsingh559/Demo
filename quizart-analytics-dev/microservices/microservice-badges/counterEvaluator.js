var getGameStat = require('./getGameStat');
var Q = require('q');

module.exports = {
    // 1:> get total win count for a user
    getNumOfWin :function(params, flag, done){
        getGameStat.getWinCountForUser([params.userId])
        .then(function(data) {
            done(null,data[0].wins);
        })
        .fail(function(err) {
            done(err,null);
        });
    },
    // 2:> get number of consecutive win for a user
    getNumOfConsWin :function(params, flag, done){
        getGameStat.getUserNOfConsWin(params.userId)
        .then(function(data) {
            done(null,data.winCount);
        })
        .fail(function(err) {
            done(err,null);
        });
    },

    // 3:> get average response time for correct answer
    avgResTimeCrct :function(params, flag, done){
        getGameStat.getUserAvgRespTime(params.userId)
        .then(function(data) {
            done(null,data);
        })
        .fail(function(err) {
            done(err,null);
        });
    },

    // 4:> get distinct topic played count
    getNumOfUniqueTopicPlayed: function(params, flag, done) {
        getGameStat.getTopicPlayedForUser(params.userId)
        .then(function(data) {
            done(null,data);
        })
        .fail(function(err) {
            done(err,null);
        });
    },
    // 5:> get number of games played by a user
    getNumOfGamePlayed:function(params, flag, done) {
        getGameStat.getUserGamePlayedCount(params.userId)
        .then(function(data) {
            done(null,data);
        })
        .fail(function(err) {
            done(err,null);
        });
    },
    // 6:> get monthly visit count for current month
    getUserLoginCount: function(params, flag, done) {
        getGameStat.getMonthlyVisitCount(params.userId)
        .then(function(data) {
            done(null,data);
        })
        .fail(function(err) {
            done(err,null);
        });
    },
    // get count of correct answer in a given gameId for user
    getNumOfCrctResCount: function(params, flag, done) {
        getGameStat.getCurrentGameStat(params.userId,params.gameData.gameId,function(data) {
            if(data.length>0){
                done(data[0].correctCount);
            }
            else {
                done(0);
            }
        });
    },
    // number of win in a topic by user
    getNumOfWinForTopic: function(params, flag, done){
        getGameStat.getTopicPlayedCountForUser(params.userId,params.gameData.topicId)
        .then(function(data) {
            done(null,data);
        })
        .fail(function(err) {
            done(err,null);
        });
    },
    // get consecutive win count
    getConsWinCount : function(params, flag, done){
        getGameStat.getConsWinCount(params.userId)
        .then(function(data) {
            done(null,data);
        })
        .fail(function(err) {
            done(err,null);
        });
    },
    // get consecutive login
    getNOfConsLogin:function(params, flag, done){
        getGameStat.getNOfConsLogin(params.userId)
        .then(function(data) {
            done(null,data);
        })
        .fail(function(err) {
            done(err,null);
        });
    },
    // get count of correct answer in a given gameId for user
    getAvgResTimeCrctCurrentGame: function(params, flag, done) {
        getGameStat.getCurrentGameStatTime(params.userId,params.gameData.gameId,function(data) {
            done(null,data);
        });
    },
    // get average win coungt for  a user
    //
}
