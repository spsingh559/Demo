const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://192.168.99.100:27017/quizRT4';
mongoose.connect(MONGO_URL, function(err) {
  if(err) { return console.error('Cannot Connect to MongoDB: ', err); }
  console.log('Connected to mongodb at: ' + MONGO_URL);
});

const Question = require('./questions.model');
// Question.syncRandom((err, result) => {
  Question.retrieveQuestions('T1',10,function(err, response) {
    if(err) { return console.error('Error occured while retrieving questions: ',err); }
    console.log(response);
  });
// });
