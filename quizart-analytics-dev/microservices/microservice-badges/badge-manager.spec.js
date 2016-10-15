const should = require('should');
const EventExecutor = require('./event-executor');
const Event = require('./event1');
var mongoose = require('mongoose');

describe('Test Badge', function() {
  before(function(done) {
    EventExecutor.prototype.retrieveCounters = function(eventType, callback) {
      const eventData = require('./data/events');
      const eventMap = {};
      eventData.forEach(function(event) {
        eventMap[event.eventType] = event;
      });
      callback(null, eventMap[eventType].counters);
    };
    EventExecutor.prototype.retrieveBadges = function(eventType, callback) {
      const eventData = require('./data/events');
      const eventMap = {};
      eventData.forEach(function(event) {
        eventMap[event.eventType] = event;
      });
      callback(null, eventMap[eventType].badges);
    }
    EventExecutor.prototype.getCounterEvaluator = function(counter, event, callback) {
      //console.log(counter);
      return callback(null, [function(callback) {
        return callback(null,5);
        
      }]);
    }
    EventExecutor.prototype.getBadgeEvaluator = function(badge, awardBadge, callback) {
      return callback(null, ['consLogin', function(consLogin) {
        const badgesData = require('./data/badges');
        var badgeFunction;
        badgesData.forEach(function(badgeData){
          if(badgeData.badgeId===badge)
            this.badgeFunction=badgeData.badgeFunct;
        }.bind(this));

        var flag=this.badgeFunction(consLogin);
        if(flag==true)
        awardBadge(badge);
        else
        awardBadge('Badge not awarded');
      }]);
    }
    done();
  });
  it('Good Habit Badge', function(done) {
    const event = new Event('successLogin','sarahconnor',{loginTime: new Date()});
    const eventExecutor = new EventExecutor(event);
    eventExecutor.execute(function(badgeId) {
      badgeId.should.be.exactly('goodHabit');
      //console.log(badgeId);
      done();
    });
  });
  after(function(done) {
    done();
  });
});