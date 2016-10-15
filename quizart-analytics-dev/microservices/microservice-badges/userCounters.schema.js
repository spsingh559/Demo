var mongoose = require('mongoose');

var userCounters = mongoose.model('userCounters', { userId: String, consLogin: Number, nOfWin: Number, nOfConsWin: Number, avgResTimeCrctCurrentGame: Number, nOfUniqTopicPlayed: Number, nOfGamePlayed: Number, nOfCrctResCurGame: Number, nOfWinForATopic: Number},'userCounters');

module.exports = userCounters;