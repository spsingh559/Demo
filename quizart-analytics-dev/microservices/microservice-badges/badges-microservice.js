var seneca = require('seneca');

var badgesMicroservicePlugin = require('.');
var badgesMicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';
badgesMicroservice.use(badgesMicroservicePlugin, {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/boilerplate-'+env
});

badgesMicroservice.use('mesh', {auto:true, pin: 'role:badges,cmd:*'});