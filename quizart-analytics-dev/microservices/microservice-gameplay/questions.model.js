const mongoose = require('mongoose');
const random = require('mongoose-random');

const QuestionSchema = new mongoose.Schema({
  "question": {type: String},
  "image" : {type: String},
  "correctIndex" : {type: Number},
  "lastEdited" : {type: Date},
  "createdOn" : {type: Date},
  "topicId" : [{type: String}],
  "frequency" : {type: Number},
  "correctRatio" : {type: String},
  "timesUsed" : {type: String},
  "difficultyLevel" : {type: Number},
  "options" : [{type: String}],
  "patternId" : {type: String},
  "googleResultScore" : {type: Number},
  "wikiPageView" : {type: Number}
},{collection: 'questionBank'});

QuestionSchema.plugin(random, { path: 'r' });

QuestionSchema.statics.retrieveQuestions = function(topicId, numberOfQuestions, callback) {
  this.findRandom({}).limit(10).exec(function(err, questions) {
    return callback(err, questions);
  });
}

module.exports = mongoose.model('questionBank', QuestionSchema);
