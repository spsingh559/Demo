// Module to fetch different analytics data from the analyticsDB

//  require model and db conf file to analytics db
var userAnalyticsSchema = require('./userAnalytics'),
    analyticsDbObj = require('./analyticsDbConObj'),
    userAnalytics = analyticsDbObj.model('userAnalytics', userAnalyticsSchema),
    userPointsSchema = require('./userPointsStat'),
    userMonthlyGameStatSchema =  require('./userMonthlyGameStat'),
    // game played and visit count has same schema with different collection
    userMonthlyGameStat = analyticsDbObj.model('usermonthlygameplayedstat', userMonthlyGameStatSchema);
    userMonthlyVisitStat = analyticsDbObj.model('usermonthlyvisitcountstats', userMonthlyGameStatSchema);
    mapReduceObjPoint = analyticsDbObj.model('userPointStat', userPointsSchema);
    Profile = require("./profile"),
    Q = require('q');


   // var mongoose = require('mongoose');
   // mongoose.connect('mongodb://localhost/quizRT4');


module.exports = {
    // function to return game stat for a given game and a user
    getCurrentGameStat: function(userId, gameId, done) {
        userAnalytics.aggregate(
            [
                 { $match:
                    {
                        userId: userId,
                        'tournamentId':'null',
						gameId: gameId
                    }
                 },
                 { $group:
                     {
                         _id:  { topicId : "$topicId" ,userId : "$userId" },
						  correctCount: {$sum: { "$cond": [{ "$eq": [ "$responseType", 'correct' ] }, 1, 0 ] }},
						  wrongCount: {$sum: { "$cond": [{ "$eq": [ "$responseType", 'wrong' ] }, 1, 0 ] }},
                          skipCount: {$sum: { "$cond": [{ "$eq": [ "$responseType", 'skip' ] }, 1, 0 ] }}
                     }
                 },
                { "$project": {
                     _id : 0, //excludes the _id field
                     "topicId" : "$_id.topicId",
                     "userId" : "$_id.userId",
                     "correctCount": "$correctCount",
                     "wrongCount" : "$wrongCount",
                     "skipCount": "$skipCount"
                    }
                }

            ], function(err, result){
                if (err) {
                   console.log(err);
                   done( { 'error': 'dbErr'} );
               } else {
                   console.log("Fetched result !!");
                //    analyticsDbObj.close();
                   done(result);
               }
            })
  }, // end of function getCurrentGameStat



  getCurrentGameStatTime: function(userId, gameId, done) {
      userAnalytics.aggregate(
          [
               { $match:
                  {
                      userId: userId,
                      gameId: gameId
                  }
               },
               { $group:
                   {
                       _id:  { topicId : "$topicId" ,userId : "$userId"},
                        correctCount: {$sum: { "$cond": [{ "$eq": [ "$responseType", 'correct' ] }, 1, 0 ] }},
                        responseTimeC : {$sum:{ "$cond": [{ "$eq": [ "$responseType", 'correct' ] }, "$responseTime", 0 ] }} ,
                        wrongCount: {$sum: { "$cond": [{ "$eq": [ "$responseType", 'wrong' ] }, 1, 0 ] }},
                        skipCount: {$sum: { "$cond": [{ "$eq": [ "$responseType", 'skip' ] }, 1, 0 ] }}
                   }
               },
              { "$project": {
                   _id : 0, //excludes the _id field
                   "topicId" : "$_id.topicId",
                   "userId" : "$_id.userId",
                   "correctCount": "$correctCount",
                   "wrongCount" : "$wrongCount",
                   "skipCount": "$skipCount",
                   "responseTimeC" : "$responseTimeC"
                  }
              }

          ], function(err, result){
              if (err) {
                 console.log(err);
                 done( -1 );
             }
             else {

              //    analyticsDbObj.close();
                if(result.length>0){
                    if (result[0].responseTimeC !== 0){
                        var totalQuesCount = result[0].correctCount + result[0].wrongCount + result[0].skipCount;
                        if ( result[0].correctCount === totalQuesCount ){
                            var avgResTimeCur =  result[0].responseTimeC/totalQuesCount;
                            done(avgResTimeCur);
                        }
                        else {
                            done(-1);
                        }
                    }
                    else {
                        done(-1);
                    }
                }
                else {
                    done(-1);
                }
             }
          })
      }, // end of function getCurrentGameStat

  getAnsStat: function(userId, gameId, responseType, done) {
    userAnalytics.aggregate(
            [
                 { $match:
                    {
                        'userId': userId,
                        'tournamentId':'null',
						'gameId': gameId,
						'responseType': responseType
                    }
                 },
                 { $group:
                     {
                         _id:  "$topicId" ,
						  responseTime: {$sum: "$responseTime"}
                     }
                 },
                 { $project:
                     {
                         _id : 0,
                         "topicId" : "$_id",
                         "responseTime" : "$responseTime"
                     }

                 }
            ],function(err, result){
                if (err) {
                   console.log(err);
                   done( { 'error': 'dbErr'} );
               } else {
                   console.log("Fetched result !!");
                   done(result);
               }
            }
    );
  },


  getAnsStatForATopic: function(userIdArr, topicId, responseType) {
      var deferred = Q.defer();
      userAnalytics.aggregate(
          [
               { $match:
                  {
                      userId: {$in : userIdArr},
                      topicId: topicId,
                      responseType:responseType
                  }
               },
               { $group:
                   {
                       _id:  { topicId : "$topicId" ,userId : "$userId" },
                        correctCount: {$sum: 1}
                   }
               },
              { "$project": {
                   _id : 0, //excludes the _id field
                   "topicId" : "$_id.topicId",
                   "userId" : "$_id.userId",
                   "correctCount": "$correctCount"
                  }
              }

          ], function(err, result){
              if (err) {
                 console.log(err);
                 deferred.resolve( { 'error': 'dbErr'} );
             } else {
                 console.log("Fetched result !!");
              //    analyticsDbObj.close();
                 deferred.resolve(result);
             }
         });
         return deferred.promise;
  },

  getAllAnsStatForUser: function(userIdArr, responseType) {
      var deferred = Q.defer();
      userAnalytics.aggregate(
          [
               { $match:
                  {
                      userId: { $in: userIdArr},
                      responseType:responseType
                  }
               },
               { $group:
                   {
                       _id:  {userId : "$userId" },
                        correctCount: {$sum: 1}
                   }
               },
              { "$project": {
                   _id : 0, //excludes the _id field
                   "userId" : "$_id.userId",
                   "correctCount": "$correctCount"
                  }
              }

          ], function(err, result){
              if (err) {
                 console.log(err);
                 deferred.resolve( { 'error': 'dbErr'} );
             } else {
                 console.log("Fetched result !!");
              //    analyticsDbObj.close();
                 deferred.resolve(result);
             }
         });
         return deferred.promise;
  },


  getAnsStatForUser: function(userId, gameId, responseType, done) {
    userAnalytics.aggregate(
            [
                 { $match:
                    {
                        'userId': userId,
                        'tournamentId':'null',
						'gameId': gameId,
						'responseType': responseType
                    }
                 },
                //  { $group:
                //      {
                //          _id:  "$topicId" ,
				// 		  responseTime: {$sum: "$responseTime"}
                //      }
                //  },
                 { $project:
                     {
                         _id : 0,
                         "topicId" : "$topicId",
                         "questionNumber" : "$questionNumber",
                         "responseTime" : "$responseTime",
                         "responseType" :"$responseType"

                     }

                 }
            ],function(err, result){
                if (err) {
                   console.log(err);
                   done( { 'error': 'dbErr'} );
               } else {
                   console.log("Fetched result !!");
                   done(result);
               }
            }
    );
  },
  // get data for a user , game wise data representing number of right and wrong
  // answer.
    getUserStatForAllGames: function(userId, done) {
        userAnalytics.aggregate(
            [
                 { $match:
                    {
                        'userId': userId
                        // 'tournamentId':'null'
                    }
                 },
                 { $group:
                     {
                         _id:  "$topicId" ,
						  correctCount: {$sum: { "$cond": [{ "$eq": [ "$responseType", 'correct' ] }, 1, 0 ] }},
						  wrongCount: {$sum: { "$cond": [{ "$eq": [ "$responseType", 'wrong' ] }, 1, 0 ] }},
                          skipCount: {$sum: { "$cond": [{ "$eq": [ "$responseType", 'skip' ] }, 1, 0 ] }}
                     }
                 },
                 { "$project": {
                     _id : 0, //excludes the _id field
                     "topicId" : "$_id",
                      "correctCount": "$correctCount",
                      "wrongCount" : "$wrongCount",
                      "skipCount": "$skipCount"
                     }
                 }
            ],
            function (err, result) {
                if (err) {
                   console.log(err);
                   done( { 'error': 'dbErr'} );
               } else {
                   console.log("Fetched result !!");
                   done(result);
               }
            }
        );
    },

    //  Get win count ascending for all the user presnt in db
    getAllUsersWinStat: function(done) {
        Profile.find(
                        {} ,
                        {
                            _id : 0,
                            userId : 1,
                            wins : 1
                        },
                        function (err, result) {
                            if (err) {
                               console.log(err);
                               done( { 'error': 'dbErr'} );
                           } else {
                               console.log("Fetched results !!");
                               done(result);
                           }
                       }
                   ).sort({ wins : -1 });  // sort ascending it sort alphabetically:(
    },

    //  Get win count for given  user presnt in db
    getWinCountForUser: function(userIdArr) {
        var deferred = Q.defer();
        Profile.find(
                        {userId: { $in:userIdArr } } ,
                        {
                            _id : 0,
                            userId : 1,
                            wins : 1
                        },
                        function (err, result) {
                            if (err) {
                               console.log(err);
                               deferred.resolve( { 'error': 'dbErr'} );
                           } else {
                               console.log("Fetched results !!");
                               deferred.resolve(result);
                           }
                       }
                   )
        return deferred.promise;
    },

    // get distinct topic played count
    getTopicPlayedForUser: function(userId) {
        var deferred = Q.defer();
        Profile.findOne(
                        {userId: userId } ,
                        {
                            _id : 0,
                            topicsPlayed:1
                        },
                        function (err, result) {
                            if (err) {
                               console.log(err);
                               deferred.resolve( null );
                           } else {
                               if(result){
                                   var tCount = result.topicsPlayed.length;
                                   deferred.resolve(tCount);
                               }
                               else {
                                   deferred.resolve(0)
                               }
                           }
                       }
                   )
        return deferred.promise;
    },

    // get topic played count for a user
    getTopicPlayedCountForUser: function(userId,topicId) {
        var deferred = Q.defer();
        Profile.findOne(
                         { userId: userId },
                         {
                             topicsPlayed:
                                { $elemMatch: { topicId: topicId } }
                         },
                        function (err, result) {
                            if (err) {
                               console.log(err);
                               deferred.resolve( null );
                           } else {
                               if(result){
                                   var tCount = result.topicsPlayed[0].gamesPlayed;
                                   deferred.resolve(tCount);
                               }
                               else {
                                   deferred.resolve(0)
                               }
                           }
                       }
                   )
        return deferred.promise;
    },


    getUserWinRank: function(userId) {
        var deferred = Q.defer();
        // get distict wins
        console.log(userId);
        Profile.distinct('wins',function(err, result){
            if (err) {
               console.log(err);
               deferred.resolve( { 'error': 'dbErr'} );
           } else {
                // check if returned result has more than one element
                if (result.length >= 2){
                    // sort result
                    sortedResult = result.sort(function (a, b) {
                        return  b - a;   //sort descending
                    });
                    // create an object to hold winCount as key and rank as value
                    var winRankObj = {};
                    var rank = 1;
                    sortedResult.forEach(function(a){
                        winRankObj[a]=rank;
                        rank += 1;
                    });
                    //   now find data for userId
                    Profile.find(
                                    {'userId' : userId},
                                    {_id:0,wins:1},
                                    function(error,res){
                                        if (error) {
                                           deferred.resolve( { 'error': 'dbErr11'} );
                                       } else {
                                        //    console.log("Rank is " + winRankObj[res[0].wins]);
                                            if( res.length >= 1 ){
                                                deferred.resolve({'label':'Total Wins','rank' : winRankObj[res[0].wins]});
                                            }
                                            else {
                                                deferred.resolve( {'label':'Total Wins','rank':'--' } );
                                            }
                                       }
                                    }
                    );
                }
                else {
                    deferred.resolve( { 'label':'Total Wins','rank': 1} );
                }

            //    done(sortedResult);
           }

       });
       return deferred.promise;
   },
   // mapReduceObjPoint
   getUserPointsRankAndStreak: function(userId){
       var deferred = Q.defer();
       // fetch sorted userId according to totalpoints
       mapReduceObjPoint.find({},{ _id:0,userId:1,userStreak:1,userStreakCurrent:1},
            function(err, results){
                if (err) {
                   console.log(err);
                   deferred.resolve( { 'error': 'dbErr'} );
               } else {
                   console.log("Fetched results !!");
                   if ( results.length >= 1 ){
                       var dataFound = false;
                       for ( i = 0; i < results.length; i+=1){
                        //    console.log(results[0]);
                           if (results[i].userId === userId){
                            //    console.log("Rank is " + Number(i+1));
                                dataFound = true;
                               deferred.resolve(
                                   {
                                       'label':'Total Points',
                                       'rank':Number(i+1),
                                       'labelStreak':'User Streak', 'userStreak':results[i].userStreak,
                                       'userStreakCurrent':results[i].userStreakCurrent
                                   }
                               );
                               break;
                           }
                        }
                        if (!dataFound){
                            // sent empty data

                            deferred.resolve(
                            {
                                'label':'Total Points',
                                'rank':"--",
                                'labelStreak':'User Streak',
                                'userStreak':
                                   { streakDates: [],
                                     winCount: "--",
                                     bestRank:"--",
                                     bestScore: "--",
                                     gamePlayedCount: "--" },
                                'userStreakCurrent':
                                   { streakDates: [],
                                     winCount: "--",
                                     bestRank:"--",
                                     bestScore: "--",
                                     gamePlayedCount: "--" }
                            });
                        }
                    }
                    else {
                        deferred.resolve( { 'error': 'dbErr'} );
                    }
                //    done(results );
                }
            }
        ).sort({ totalPoint : -1 });
        return deferred.promise;
    },

    getUserNOfConsWin: function(userId){
        var deferred = Q.defer();
        // fetch sorted userId according to totalpoints
        mapReduceObjPoint.find({'userId':userId},{'userStreakCurrent.winCount':1},
             function(err, results){
                 if (err) {
                    console.log(err);
                    deferred.resolve( { 'error': 'dbErr'} );
                }
                else {
                    console.log("Fetched results !!");
                    // console.log("oo"+results);
                    if ( results.length >= 1 ){
                        if(results[0].userStreakCurrent){
                            var retVal = results[0].userStreakCurrent.winCount;
                            if( retVal === undefined ){
                                retVal=0;
                            }
                            deferred.resolve( {winCount:retVal} );
                        }
                        else {
                            deferred.resolve( {winCount:0} );
                        }
                    }
                    else {
                        deferred.resolve( {winCount:0} );
                    }
                }
            });
         return deferred.promise;
     },

     getNOfConsLogin: function(userId){
         var deferred = Q.defer();
         // fetch sorted userId according to totalpoints
         userMonthlyVisitStat.findOne({'userId':userId},
         {'consecutiveCount':1,_id:0},
              function(err, result){
                  if (err) {
                     console.log(err);
                     deferred.resolve(0);
                 }
                 else {
                     if(result){
                         deferred.resolve(result.consecutiveCount);
                     }
                     else {
                         deferred.resolve(0);
                     }
                 }
             });
          return deferred.promise;
      },
    //  get consecutive win count for user
     getConsWinCount: function(userId){
         var deferred = Q.defer();
         // fetch sorted userId according to totalpoints
         mapReduceObjPoint.findOne({userId:userId},
                                {consWinCount:1},
                function(err, result){
                  if (err) {
                     console.log(err);
                     deferred.resolve(0) ;
                 }
                 else {
                     if(result)
                         if(result.consWinCount){
                             deferred.resolve(result.consWinCount) ;
                         }
                         else {
                             deferred.resolve(0) ;
                         }
                    else {
                        deferred.resolve(0) ;
                    }
                 }
             });
          return deferred.promise;
      },


    getUserAvgRespTimeRank: function(userId){
        var deferred = Q.defer();
        // fetch sorted userId according to totalpoints
        mapReduceObjPoint.find({},{'avgResponseTime':1, _id:0,userId:1},
             function(err, results){
                 if (err) {
                    console.log(err);
                    deferred.resolve( { 'error': 'dbErr'} );
                } else {
                 //    console.log("Fetched results !!");
                    if ( results.length >= 1 ){
                        for ( i = 0; i < results.length; i+=1){
                         //    console.log(results[0]);
                            if (results[i].userId === userId){
                             //    console.log("Rank is " + Number(i+1));
                                deferred.resolve({'label':'Avg Response Time','rank':Number(i+1)});
                                break;
                            }
                         }
                         deferred.resolve( {'label':'Avg Response Time','rank':'--'} );
                     }
                     else {
                         deferred.resolve( { 'error': 'dbErr'} );
                     }
                 //    done(results );
                 }
             }
         ).sort({'avgResponseTime': 1}); //sort ascending
         return deferred.promise;
     },

     getUserAvgRespTime: function(userId){
         var deferred = Q.defer();
         mapReduceObjPoint.findOne({userId:userId},{'avgResponseTime':1},
              function(err, results){
                if (err) {
                     deferred.resolve( { 'error': 'dbErr'} );
                }
                else {
                    if ( results ){
                        deferred.resolve(results.avgResponseTime);
                    }
                    else {
                        deferred.resolve( null );
                    }
                }
              }
          )
          return deferred.promise;
      },
    //   get game played count for user
      getUserGamePlayedCount: function(userId){
          var deferred = Q.defer();
          Profile.findOne({userId:userId},{'totalGames':1},
               function(err, results){
                 if (err) {
                      deferred.resolve( null );
                 }
                 else {
                     if ( results ){
                         deferred.resolve( results.totalGames );
                     }
                     else {
                         deferred.resolve( 0 );
                     }
                 }
               }
           )
           return deferred.promise;
       },

     getUserCorrectPerRank: function(userId){
         var deferred = Q.defer();
         // fetch sorted userId according to totalpoints
         mapReduceObjPoint.find({},{'correctPercentage':1, _id:0,userId:1},
              function(err, results){
                  if (err) {
                     console.log(err);
                     deferred.resolve( { 'error': 'dbErr'} );
                 } else {
                  //    console.log("Fetched results !!");
                     if ( results.length >= 1 ){
                         for ( i = 0; i < results.length; i+=1){
                          //    console.log(results[0]);
                             if (results[i].userId === userId){
                              //    console.log("Rank is " + Number(i+1));
                                 deferred.resolve({'label':'Correctness Ratio','rank':Number(i+1)});
                                 break;
                             }
                          }
                          deferred.resolve( {'label':'Correctness Ratio','rank':"--"} );
                      }
                      else {
                          deferred.resolve( { 'error': 'dbErr'} );
                      }
                  //    done(results );
                  }
              }
          ).sort({'correctPercentage': -1}); //sort ascending

          return deferred.promise;
    },


    // function to get monthly uniq games played by an user for a year
    //  "statType" here refers "visits"  or "gamePlayed"
    // out is : { March: 1, April: 3 }
    // in case of no matching data return value is { 'error': 'dbErrNoData'}
    getMonthlyGameStat: function(userId,year,statType){
        var deferred = Q.defer();
        // assign dbObj  value depending on data requirement
        var resLabel = "";

        if( statType === "visits" ){
            dbObj = userMonthlyVisitStat;
            resLabel = "Visit Count";
        }
        else if ( statType === "gamePlayed" ){
            var dbObj = userMonthlyGameStat;
            resLabel = "Game Played Count";
        }
        else {
            // wrong value received return
            deferred.resolve([ { 'error': 'wrongInputValue'} ]);
            return deferred.promise;
        }
        dbObj.find(
            { 'userId' : userId, 'years.yearVal' : year },
            { 'years.monthObj' : 1, _id : 0 },
             function(err, results){
                 if (err) {
                    console.log(err);
                    deferred.resolve([ { 'error': 'dbErr'}] );
                } else {
                 //    console.log("Fetched results !!");
                    if ( results.length >= 1 ){
                        var retArr = [];
                        results.forEach(function(doc){
                            doc.years.forEach(function(mObj){
                                mObj.monthObj.forEach(function(mVal){
                                    retArr.push(
                                        {
                                            'Month' : mVal.month
                                        }
                                    );
                                    retArr[retArr.length-1][resLabel]=mVal.count;
                                });
                            });
                        });
                        deferred.resolve( retArr );
                     }
                     else {
                         deferred.resolve([ { 'error': 'dbErrNoData'} ]);
                     }
                 //    done(results );
                 }
             }
         );
         return deferred.promise;
    },

    getMonthlyVisitCount: function(userId){
        var deferred = Q.defer();
        var year = new Date().getFullYear();
        var monthIndex = new Date().getMonth();
        var monthNames = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ];
        var month = monthNames[monthIndex];
        userMonthlyVisitStat.find(
            { 'userId' : userId, 'years.yearVal' : year },
            { 'years.monthObj' : 1, _id : 0 },
             function(err, results){
                 if (err) {
                    console.log(err);
                    deferred.resolve( null );
                } else {
                 //    console.log("Fetched results !!");
                    if ( results.length >= 1 ){
                        var retArr = [];
                        results.forEach(function(doc){
                            doc.years.forEach(function(mObj){
                                mObj.monthObj.forEach(function(mVal){
                                    if(mVal.month===month){
                                        retArr.push(mVal.count);
                                    }
                                });
                            });
                        });
                        deferred.resolve( retArr[0] );
                     }
                     else {
                         deferred.resolve( 0 );
                     }
                 //    done(results );
                 }
             }
         );
         return deferred.promise;
    }
};
