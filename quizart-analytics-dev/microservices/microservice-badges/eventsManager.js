var Event = require('./event');
var eventsData = require('./eventsData.js');

/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quizRT4',function () {
  console.log('connected');
});*/

var eventsManager = function(){
  this.events = eventsData;

  //Load events data from a js file (eventsData.js)
  this.loadEventsToDB = function(){
    this.events.forEach(function(eventData){
      var eventObj = {};
      eventObj.eventType = eventData.eventType;
      eventObj.counters = eventData.counters;
      eventObj.badges = eventData.badges;
      Event.findOneAndUpdate({eventType:eventObj.eventType},eventObj,{upsert:true, new:true},function(err, doc) {
          if(err)
            console.log(err);
        //   console.log(doc);
      });
    });
  };

  //Get all the events from DB
  this.fetchEvent = function(eventType,callback){
    Event.findOne({eventType:eventType},callback);
  };
}
module.exports=eventsManager;

//new eventsManager().loadEventsToDB();
/*new eventsManager().fetchEvent('gameFinish',function (err,data) {
  console.log(data);
});*/
