// Creating this schema for storing and updating map reduce analysed value
// for user points data to collection

var mongoose = require('mongoose'),
    userPointsSchema = mongoose.Schema({
        userId: String,
        timeStamp: Date,
        // adding this time stamp to track when was last
        // response values got updated
        lastUpdatedRespTime: Date,
        totalPoint: Number,
        totalResponseTime: Number,
        numOfQuesAttempted: Number,
        avgResponseTime: Number,
        correctResponseCount: Number,
        wrongResponseCount: Number,
        skipResponseCount: Number,
        correctPercentage: Number,
        wrongPercentage: Number,
        skipPercentage: Number,
        userStreak : {
            streakDates :Array,
            gamePlayedCount:Number,
            bestScore:Number,
            bestRank:Number,
            winCount:Number
        },
        userStreakCurrent : {
            streakDates :Array,
            gamePlayedCount:Number,
            bestScore:Number,
            bestRank:Number,
            winCount:Number
        },
        consWinCount:Number

    });

 module.exports = userPointsSchema;
