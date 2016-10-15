var Badge = require('./badge');
var Profile = require('./profile');
var badgesData = require('./badgesData.js');

/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quizRT4',function () {
  console.log('connected');
});*/

var badgesManager = function(){
  this.badges = badgesData;

  //Load badge data from a js file (badgesData.js)
  this.loadBadgesToDB = function(){
    this.badges.forEach(function(badgeData){
      var badge = {};
      badge.badgeId = badgeData.badgeId;
      badge.badgeName = badgeData.badgeName;
      badge.badgeDesc = badgeData.badgeDesc;
      badge.badgeUrl = badgeData.badgeUrl;
      badge.badgeRule = badgeData.badgeRule;
      badge.badgeDep = badgeData.badgeDep;
      badge.badgeFunct = badgeData.badgeFunct;
      Badge.findOneAndUpdate({badgeId:badge.badgeId},badge,{upsert:true, new:true},function(err, doc) {
          if(err)
            console.log(err);
        //   console.log(doc);
      });
    });
  };

  //Get all the badges from DB
  this.fetchAllBadges = function(callback){
    Badge.find({},callback);
  };

  //Get all the badges by ID from DB
  this.getBadgesById = function(badgeIds,callback){
    Badge.find({badgeId:{$in:badgeIds}},callback);
  };

  //Get one badge by ID from DB
  this.getBadgeById = function(badgeId,callback){
    Badge.findOne({badgeId:badgeId},callback);
  };

  //Add badges to user profile
  this.addBadgesToUser = function(userId, badgeId, callback){
    Profile.findOneAndUpdate({userId:userId}, {$push:{badges:badgeId}}, {upsert:false, new:true}, callback);
  }

  //Get all badges won by a particular user
  this.getUserBadges = function(userId, callback){
    Profile.findOne({userId:userId},{badges:1,_id:0}, callback);
  }
}
module.exports=badgesManager;

//new badgesManager().loadBadgesToDB();
