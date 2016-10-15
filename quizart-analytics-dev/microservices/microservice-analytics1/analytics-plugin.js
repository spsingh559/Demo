var mongoose = require('mongoose');

module.exports = function(options) {

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
  const Game = connection.model('Game', require('./gameschema'),'game_info');
  const Filter = connection.model('Filter', require('./filterschema'),'topicswinsloss');
  const Winloss = connection.model('Winloss', require('./winloss.schema'),'win_loss');
  const Leaderboard = connection.model('Leaderboard', require('./leaderboardschema'),'leaderboard');
  const Gamesplayed = connection.model('Gamesplayed', require('./gamesplayedschema'),'gamesPlayed');
  
  
  this.add('role:analytics,cmd:favouritetopics',function(msg,respond){
    Filter.find({userId:msg.userid},function(err,response){
      if(err) return handleError(err);
      console.log(response._id);
      console.log(response.favTopics);
      console.log(response.userId);
    return respond(null,{response: 'success', result: response}); 
    });
});

  this.add('role:analytics,cmd:favtopicsfilter',function(msg,respond){

     Game.aggregate([
            { $group: { _id: "$user_id", count: {$sum: 1} } },
            { $project: { _id:0,count:1,userId: "$_id",gamesplayed:"$count" } },
            { $out: "gamesPlayed" }

          ], function(err, result) {
            if(err) { return console.error("Error with Aggregate"); }
            console.log("Result", JSON.stringify(result));
          });


     Game.aggregate([
            { $group: { _id: {userId: "$user_id", topicId: "$topic_id"}, 
            loss:{$sum:{$cond: { if: { $eq: [ "$status", "Loss" ] }, then: 1, else: 0 } } },wins:{$sum:{$cond: { if: { $eq: [ "$status", "Win" ] }, then: 1, else: 0 } } },count:{$sum:1}}},
            { $group: { _id: "$_id.userId", favTopics: {$push: { gamesPlayed:"$count",wins:"$wins",loss:"$loss",topicId: "$_id.topicId"} } }},
            { $unwind:"$favTopics"},
            { $sort : {favTopics:-1}},
            { $project: { userId: "$_id", _id: 0, favTopics: 1 } },
            { $out: "topicswinsloss" }
          ], function(err, result) {
            if(err) { return console.error("Error with Aggregate"); }
            consoloe.log("Result", JSON.stringify(result[0]));
          });
     console.log("analytics filterdata");
   return respond(null,{response: 'success', result: "Data is Filtered and stored in topicswinsloss Collection" });
});

  this.add('role:analytics,cmd:winlossfilter',function(msg,respond){
    Game.aggregate([
              { $group: { _id: {userId: "$user_id", statusId: "$status"}, count: {$sum: 1} } },
            { $group: { _id: "$_id.userId", status: {$push: {statusId: "$_id.statusId", count: "$count"} } }},
            { $sort : {status:-1}},
            { $project: { _id:1,status:1,userId: "$_id" } },
            { $out: "win_loss" }

          ], function(err, result) {
            if(err) { return console.error("Error with Aggregate"); }
            console.log("Result", JSON.stringify(result[0]));
          });
    
    return respond(null,{response: 'success', result: "Data is Filtered and stored in win_loss Collection"}); 
    });

this.add('role:analytics,cmd:winloss',function(msg,respond){
    Winloss.findOne({userId:msg.userid},function(err,response){
      if(err) return handleError(err);
      console.log(response);
    return respond(null,{response: 'success', result: response.status}); 
    });
    });

this.add('role:analytics,cmd:leaderboardfilter',function(msg,respond){

           Game.aggregate([
            { $group: { _id: {topicId: "$topic_id", userId: "$user_id"}, 
            loss:{$sum:{$cond: { if: { $eq: [ "$status", "Loss" ] }, then: 1, else: 0 } } },wins:{$sum:{$cond: { if: { $eq: [ "$status", "Win" ] }, then: 1, else: 0 } } },count:{$sum:1}}},
            { $group: { _id: "$_id.topicId", favTopics: {$push: { experience:{"$sum":["$count","$wins"]},gamesPlayed:"$count",wins:"$wins",loss:"$loss",userId: "$_id.userId"} } }},
            { $unwind:"$favTopics"},
            // {$project:{favTopics:1,just:{"$sum":["$favTopics.gamesPlayed","$favTopics.$wins"]}}},
            { $sort : {favTopics:-1}},

            { $project: { topicId: "$_id", _id: 0, favTopics: 1 } },
            { $out: "leaderboard" }
          ], function(err, result) {
            if(err) { return console.error("Error with Aggregate"); }
            consoloe.log("Result", JSON.stringify(result[0]));
          });
       return respond(null,{response: 'success', result: "leaderboardfilter"}); 
    });

this.add('role:analytics,cmd:leaderboard',function(msg,respond){
    Leaderboard.find({topicId:msg.topicid},function(err,response){
      if(err) return handleError(err);
      console.log(response.favTopics);
    return respond(null,{response: 'success', result: response}); 
    });

    });
this.add('role:analytics,cmd:gamesplayed',function(msg,respond){
    Gamesplayed.findOne({userId:"abbylangley@avit.com"},function(err,response){
      if(err) return handleError(err);
     
    return respond(null,{response: 'success', result: response.gamesplayed}); 
    });
    });    



}