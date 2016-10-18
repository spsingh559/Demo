var seneca = require('seneca');

  var notificationMicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

notificationMicroservice.use('.', {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/quizRT4'+env
});
notificationMicroservice.use('mesh', {auto:true, pin: 'role:notification,cmd:*'});

