const seneca = require('seneca');
const gameProvisionerPlugin = require('./game-provisioner/index.js');

const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || 'mongodb://locahlost:27017/quizRT4';
mongoose.connect(MONGO_URL, function(err) {
  if(err) { return console.error('Cannot Connect to MongoDB: ', err); }
  console.log('Connected to mongodb at: ' + MONGO_URL);
});

const Questions = require('./questions.model');

const gameProvisioner = seneca();
gameProvisioner.use(gameProvisionerPlugin, {playersPerGame: 4, generateQuestions: Questions.retrieveQuestions.bind(Questions), questionTime: 10000, questionsPerGame: 10});
