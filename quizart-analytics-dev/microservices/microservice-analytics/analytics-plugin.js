var mongoose = require('mongoose')

var bcrypt = require('bcrypt');

exports = module.exports = function(options) {
  const connection = mongoose.createConnection(options.mongoUrl);

  connection.on('connected', function() {
    console.log('Mongoose connection open to: ' + options.mongoUrl);
  });

  connection.on('error', function() {
    console.error('Mongoose connection error: ' + options.mongoUrl);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose connection disconnected due to app SIGINT.');
    });
  });


  const userAnalytics = connection.model('userAnalytics', require('./userAnalytics.schema.js'));

  this.add('role:analytics,cmd:create', function(msg, respond) {
        //  console.log("msg===="+msg+"=====");
       return  userAnalytics.create(msg,function(err,newpost){
            if(err){
                     return respond(err);
                }
             else return respond(null,{response:'success',entity:newpost});
    });
  });

  this.add('role:analytics,cmd:dangerouslyDeleteAllAnalytics', function(msg, respond) {
    return userAnalytics.remove({}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });

<<<<<<< HEAD
  this.add('role:analytics,cmd:favouritetopics',function(msg,respond){
    var result=[
                {  y: 4181563, legendText:"Sherlock", indexLabel: "Sherlock" },
                {  y: 2175498, legendText:"Movies", indexLabel: "Movies" },
                {  y: 3125844, legendText:"Logos",exploded: true, indexLabel: "Logos" },
                {  y: 1176121, legendText:"Sports" , indexLabel: "Sports"},
                {  y: 1727161, legendText:"Cricket", indexLabel: "Cricket" },
                {  y: 4303364, legendText:"General Knowledge" , indexLabel: "General Knowledge"},
                {  y: 1717786, legendText:"Animals" , indexLabel: "Animals"}
            ]
            console.log("analytics add");
    return respond(null,{response: result});
  });
  
=======
   this.add('role:analytics,cmd:favouritetopics', function(msg, respond) {
        //  console.log("msg===="+msg+"=====");
       return  userAnalytics.create(msg,function(err,newpost){
            if(err){
                     return respond(err);
                }
             else return respond(null,{response:'success',entity:newpost});
    });
  });
>>>>>>> f44f7fedd1a1e737461ee71716bccde7cc19691d
};

