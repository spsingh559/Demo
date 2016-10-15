var mongoose = require('mongoose'),
    Topic=require('./topic'),
    Tournament = require('./tournament'),
    Q = require('q'),
    _ = require('underscore'),
    profileSchema = mongoose.Schema({
      userId: {type:String, unique:true},
      name:String,
      age:Number,
      emailId:String,
      imageLink:String,
      country:String,
      flagLink:String,
      badge:String,
      badges: Array,
      totalGames:Number,
      wins:Number,
      topicsPlayed:[{
        gamesWon: Number,
        gamesPlayed:Number,
        level:Number,
        isFollowed:Boolean,
        points:Number,
        topicId: {type:String, ref: 'Topic'},
        ranks:Array,
        gameInfo : [{
            gameId: String,
            score: Number,
            rank:Number,
            gameDate:Date
        }]
      }],
      tournaments: [{
        tournamentId:{ type: String, ref: 'Tournament'},
        status:String, //can be amongst "FOLLOWED","PLAYING", or "COMPLETED"
        levelCleared:{type:Number,default:0},
        finalLevel:Number,
        levelPoints:Array,
        isFollowed:Boolean
      }]
    },
    {strict:false});


    profileSchema.statics.getUserIdFromId = function getUserIdFromId(from,to){
      var deferred = Q.defer();
      var doc = [];
      mongoose.model('Profile')
     .find({userId : {$in : [from ,to]}},{'_id' : 1})
     .exec(function(err,docs){
       if (err) {
         deferred.reject(err);
       }
       docs != 'undefined' && docs.length > 0 ? deferred.resolve(docs) : deferred.reject([]);
     });
     return deferred.promise;
    }
    var Profile = mongoose.model('Profile', profileSchema, "profile_collection");



module.exports = Profile;
