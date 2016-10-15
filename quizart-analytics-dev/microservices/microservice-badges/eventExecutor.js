var Asynchrony = require('asynchrony-di');
var BadgesManager = require('./badgesManager');
var EventsManager = require('./eventsManager');
var CounterEval = require('./counterEvalFunction');
var _ = require('underscore');

var badgesManager = new BadgesManager();
var eventsManager = new EventsManager();
var counterEval = new CounterEval();

var EventExecutor = function (event) {
  this.event = event;
};

EventExecutor.prototype.execute = function (callback) {
  var userId = this.event.userId,
    eventType = this.event.eventType,
    gameData = this.event.gameData,
    asynchrony = new Asynchrony();

  //get event related badges and counters
  /*var eventData = {
    badges: ['thumbsUp','goodHabit','highFive'], //has nOfWin, consLogin, nOfWin
    counters: ['nOfWin','nOfConsWin']
  }*/
  eventsManager.fetchEvent(eventType, function (err, eventData) {
    var badges = eventData.badges,
      counters = eventData.counters;
    //filter out badges user already has won
    badgesManager.getUserBadges(userId, function (err, doc) {
      if (err)
        console.log(err);
      badges = _.difference(badges, doc.badges); //get badgeId that the user does not possess
      //console.log('Badges to be evaluated : '+badges);
      badgesManager.getBadgesById(badges, function (err, badgeData) { //get data for probable badges
        if (err)
          console.log(err);
        var badgeCounters = _.uniq(_.flatten(_.pluck(badgeData, 'badgeDep'))),
          readOnlyCounters = _.difference(badgeCounters, counters);

        // console.log('Execute counters : '+ counters);
        // console.log('Read-only counters : '+ readOnlyCounters);

        var params = {};
        params.userId = userId;
        params.gameData = gameData;

        counters.forEach(function (counter) {
          asynchrony.add(counter, [counterEval.getFunction(counter, params, true)]);
        });

        readOnlyCounters.forEach(function (counter) {
          asynchrony.add(counter, [counterEval.getFunction(counter, params, false)]);
        });

        badgeData.forEach(function (badge) {
          var dep = new Array(badge.badgeDep);
          dep.push(badge.badgeFunct);
          asynchrony.invoke(dep).then(function (condition) {
            if (condition) {
              callback.apply(null, [badge.badgeId]);
            }
          });
        });
      });
    });
  });
};
module.exports = EventExecutor;
