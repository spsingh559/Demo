/**
 * Created by GH316885 on 3/17/2016.
 */
var mongoose = require('mongoose'),
    userAnalyticsSchema = mongoose.Schema({
        userId: String,
        gameId: String,
        tournamentId: String,
        topicId: String,
        questionId: String,
        selectedOptionId : Number,
        responseType : String,
        responseTime: Number,
        questionNumber : Number,
        gameTime: Date,
        insertTime: Date
    });

 module.exports = userAnalyticsSchema;
