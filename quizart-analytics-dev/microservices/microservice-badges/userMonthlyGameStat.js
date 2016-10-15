// Creating this schema for storing and updating map reduce analysed value
// this shall get used to verify the existing data and also add new data
// to collection

var mongoose = require('mongoose'),
    userMapReduceSchema = mongoose.Schema({
        userId: String,
        timeStamp: Date,
        consecutiveCount:Number,
        years :[
                {
                yearVal : Number,
                yearlyCount: Number,
                monthObj : [
                    {
                        month : String,
                        count : Number
                    }
                ]
            }
        ]
    });

 module.exports = userMapReduceSchema;
