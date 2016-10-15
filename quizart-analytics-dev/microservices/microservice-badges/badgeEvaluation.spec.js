var should = require('should');
var fs = require('fs');
var Event = require('./eventCreator');
var EventExecutor = require('./eventExecutor');
describe("Test Badges",function () {
  EventExecutor.prototype.fetchData = function (callback) {
    fs.readFile('./userData.json',(function (err,data) {
      var data=JSON.parse(data);
      data.forEach((function (userData) {
        if(userData.userId===this.event.userId){
          callback(null,userData[this.event.eventType].count);
        }
      }).bind(this));
    }).bind(this));
  };

  EventExecutor.prototype.fetchBadges = function (callback) {
    fs.readFile('./badgesRule.json',(function (err,data) {
      var badges=JSON.parse(data);
      badges.forEach((function (badge) {
        callback(null,badge);
      }).bind(this));
    }).bind(this));
    //callback(null,badges);
  };
  it('Good Habit badge testing',function (done) {
    var event = new Event('gameWon','Abhishek');
    var eventExecutor = new EventExecutor(event);
    eventExecutor.execute(function (badgeId) {
      //TODO badge pop implementation;
      badgeId.should.be.exactly('thumbsUp');
      //done();
    });
    done();
  });
});
