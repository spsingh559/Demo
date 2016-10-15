const EventExecutor = require('./event-executor');
const Event = require('./event1');
var mongoose = require('mongoose');
const userLogin=require('./userLogin.schema');
const userCounters=require('./userCounters.schema');

EventExecutor.prototype.retrieveCounters = function (eventType, callback) {
  const eventData = require('./data/events');
  const eventMap = {};
  eventData.forEach(function (event) {
    eventMap[event.eventType] = event;
  });
  callback(null, eventMap[eventType].counters);
};
EventExecutor.prototype.retrieveBadges = function (eventType, callback) {
  const eventData = require('./data/events');
  const eventMap = {};
  eventData.forEach(function (event) {
    eventMap[event.eventType] = event;
  });
  callback(null, eventMap[eventType].badges);
}
EventExecutor.prototype.getCounterEvaluator = function (counter, event, callback) {
  return callback(null, [function (callback) {
    var userId=event.user;
    userCounters.find({userId:userId},function(err,counters){
        if(err) throw err;

        var count=counters[0][counter];
        var date1,date2;
        //getting the last two dates
        userLogin.find({userId:userId},function(err,users){
            if(err) throw err;

            console.log(users);
            if(users.length==1){
              count= count+1;
            }
            else{
              date1=users[users.length-1].loginTime;
              date2=users[users.length-2].loginTime;

              date1day=date1.getDate();
              date1month=date1.getMonth()+1;
              date1year=date1.getFullYear();
              date2day=date2.getDate();
              date2month=date2.getMonth()+1;
              date2year=date2.getFullYear();

              if(date1year==date2year){
                  if(date1month==date2month){
                      if(date1day==date2day){
                          count= count;
              }}}
              else if(Math.abs(date1day-date2day)>1){
                  count= 1;
              }
              else if(date1day-date2day==1){
                count=count+1;
              }
            }

            userCounters.findOneAndUpdate({userId:userId}, {$set:{consLogin:count}},function(err, doc){
                if(err){console.log("Something wrong when updating data!");}

                console.log(count);
                return callback(null, 1);
            });
        });
       });
  }]);
}
EventExecutor.prototype.getBadgeEvaluator = function (badge, awardBadge, callback) {
  return callback(null, ['consLogin', function (consLogin) {
    const badgesData = require('./data/badges');
    var badgeFunction;
    badgesData.forEach(function (badgeData) {
      if (badgeData.badgeId === badge)
        this.badgeFunction = badgeData.badgeFunct;
    }.bind(this));

    var flag = this.badgeFunction(consLogin);

    if (flag == true)
      awardBadge(badge);
    else
      awardBadge('Badge not awarded');
  }]);
}

module.exports = function (options) {
  mongoose.connect(options.mongoUrl);

  console.log('===================badges-microservice-plugin=======================');
  this.add('role:badges,cmd:login', function (msg, respond) {
    console.log("===============Inside add function of microservice badges plugin==================");
    const event = new Event('successLogin', msg.userId, { loginTime: new Date() });
    const eventExecutor = new EventExecutor(event);

    setUserLoginStatus(event.eventData.loginTime, msg.userId);

    eventExecutor.execute(function (badgeId) {
      console.log(badgeId);
      respond(null, { badge: badgeId });
    });
  });
};

var setUserLoginStatus=function(loginTime, userId){

    userLogin.find({userId:userId},function(err,users){
        if(err) throw err;

        if(users.length==0)
        new userCounters({userId: userId, consLogin: 0, nOfWin: 0, nOfConsWin: 0, avgResTimeCrctCurrentGame: 0, nOfUniqTopicPlayed: 0, nOfGamePlayed: 0, nOfCrctResCurGame: 0, nOfWinForATopic: 0}).save();
    });
    new userLogin({userId: userId,loginTime:loginTime}).save();
}

var setCounter=function(count,userId){

}
