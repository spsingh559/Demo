const Asynchrony = require('asynchrony-di');
const async = require('async');
const Events=require('./data/events')

function EventExecutor(event) {
  this.execute = function execute(awardBadge) {
    async.waterfall([
        function createContext(callback) {
          //console.log(event.eventData.loginTime);
          const context = {asynchrony: new Asynchrony()};
          callback(null, context);
        },
        (context, callback) => {
          async.parallel([
            setCountersInContext.bind(this,event.eventType,context),
            retrieveBadgeEvaluators.bind(this, event.eventType, awardBadge, context)
          ], function(err) {
            callback(null,context);
          });
        },
        (context, callback) => {
          //console.log(context);
          async.series([
              setCountersRequiredByBadgesInContext.bind(this, context.badgeEvaluators, context),
              addCountersIntoAsynchrony.bind(this,context,context.asynchrony,event),
              evaluateBadgesInAsynchrony.bind(this,context.badgeEvaluators, context.asynchrony)
            ], callback);
        }
      ]);
  }
}

EventExecutor.prototype.retrieveCounters = function(eventType, callback) {
  // TODO: Retrieve Counters
  console.log('TODO: INSIDE EventExecutor.prototype.retrieveCounters');
}

EventExecutor.prototype.retrieveBadges = function(eventType, callback) {
  // TODO: Retrieve Badges
  console.log('TODO: INSIDE EventExecutor.prototype.retrieveBadges');
}

EventExecutor.prototype.getCounterEvaluator = function(counter, event, callback) {
  // TODO: Construct Counter evaluator and return.
  console.log('TODO: INSIDE EventExecutor.prototype.getCounterEvaluator');
};

EventExecutor.prototype.getBadgeEvaluator = function(badge, badgeAwardedFunction, callback) {
  // TODO: Construct Badge evaluator and return.
  console.log('TODO: INSIDE EventExecutor.prototype.getCounterEvaluator');
}

function setCountersInContext(eventType, context, callback) {
  this.retrieveCounters(eventType,function(err, counters){
    context.counters = new Set();
    counters.forEach(function(counter) {
      context.counters.add(counter);
    });
    callback(null,context);
  });
}

function retrieveBadgeEvaluators(eventType, awardBadge, context, callback) {
  this.retrieveBadges(eventType,function(err, badges){
    var arr=[];
    badges.forEach(function(badge){
        this.getBadgeEvaluator(badge, awardBadge,function(err, badgeEvaluator){
          arr.push(badgeEvaluator);
      });
      context.badgeEvaluators=arr;
      callback(null,context);
    }.bind(this));
  }.bind(this));
}

function setCountersRequiredByBadgesInContext(badgeEvaluators, context, callback) {
  badgeEvaluators.forEach(function(badgeEvaluator){
    badgeEvaluator.slice(0,badgeEvaluator.length-1).forEach(function(counter) {
        context.counters.add(counter);
      });
  });
  callback(null,context);
}

function addCountersIntoAsynchrony(context,asynchrony,event,callback) {
  context.counters.forEach(function(counter){
    this.getCounterEvaluator(counter,event,function(err, counterEvaluator){
      asynchrony.add(counter,counterEvaluator);
    });
  }.bind(this));
  callback(null,context);
}

function evaluateBadgesInAsynchrony(badgeEvaluators, asynchrony, callback) {
  badgeEvaluators.forEach(function(badgeEvaluator){
    //console.log(badgeEvaluator);
    asynchrony.invoke(badgeEvaluator);
  });
  callback(null,asynchrony);
}

module.exports = EventExecutor;