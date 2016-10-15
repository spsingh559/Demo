var counterEvaluator = require('./counterEvaluator');
var mongoose=require('mongoose');
var userLogin=require('./userLogin.schema');
var userLoginCounter=require('./userLoginCounter');
mongoose.connect('mongodb://localhost/Counters');
var Counters=function () {}
Counters.prototype.getFunction = function (counter,data,flag) {
  switch (counter) {
      case 'nOfWin':
        return function (done) {
          counterEvaluator.getNumOfWin(data,flag, function(err,value) {
              if(err)
                console.error(err);
              done(null,value);
          });
        };
      case 'nOfConsWin':
        return function(done) {
          counterEvaluator.getNumOfConsWin(data,flag, function(err,value) {
            if(err)
              console.error(err);
            done(null,value);
          });
        };
      case 'avgResTimeCrctCurrentGame':
        return function(done) {
          counterEvaluator.getAvgResTimeCrctCurrentGame(data,flag, function(err,value) {
            if(err)
              console.error(err);
            done(null,value);
          });
        };
      case 'consLogin':
        return function(done) {
          counterEvaluator.getUserLoginCount(data,flag, function(err,value) {
            if(err)
              console.error(err);


              console.log('=========================Inside counterEvalFunction===============================');
            evaluate();
            done(null,value);
          });
        };
      case 'nOfUniqTopicPlayed':
        return function(done) {
          counterEvaluator.getNumOfUniqueTopicPlayed(data,flag, function(err,value) {
            if(err)
              console.error(err);
            done(null,value);
          });
        };
      case 'nOfGamePlayed':
        return function(done) {
          counterEvaluator.getNumOfGamePlayed(data,flag, function(err,value) {
            if(err)
              console.error(err);
            done(null,value);
          });
        };
      case 'nOfCrctResCurGame':
        return function(done) {
          counterEvaluator.getNumOfCrctResCount(data,flag, function(err,value) {
            if(err)
              console.error(err);
            done(null,value);
          });
        };
      case 'nOfWinForATopic':
        return function(done) {
          counterEvaluator.getNumOfWinForTopic(data,flag, function(err,value) {
            if(err)
              console.error(err);
            done(null,value);
          });
        };
  }
};
module.exports = Counters;


var evaluate=function(){

    var date1,date2,count;

        //getting the last two dates
        userLogin.find({userId:"user1"},function(err,users){
            if(err) throw err;
            var i=3;
            date1=users[users.length-1].loginTime;
            date2=users[users.length-2].loginTime;

            date1day=date1.getDate();
            date1month=date1.getMonth()+1;
            date1year=date1.getFullYear();

            date2day=date2.getDate();
            date2month=date2.getMonth()+1;
            date2year=date2.getFullYear();
            
            //revisit this
            if(date1year==date2year)
            {
                if(date1month==date2month)
                {
                    while(date1day==date2day)
                    {
                        date2=users[users.length-3].loginTime;
                        date2day=date2.getDate();
                        date2month=date2.getMonth()+1;
                        date2year=date2.getFullYear();
                    }
                }
            }
            
            //getting the counter value
            userLoginCounter.find({},function(err,users){
                if(err) throw err;

                count=users[0].count;//counter

                //comparing dates
                if(date1day-date2day==1)
                {  
                    console.log(count+1);
                    //updating counters
                    userLoginCounter.findOneAndUpdate({count:count}, {$set:{count:count+1}},function(err, doc){
                        if(err){
                            console.log("Something wrong when updating data!");
                        }
                    });

                    if((count+1)%5==0)
                    {
                        console.log("Good Habbit Badge Awarded");
                        awardBadge();
                    }
                }
                });
        });
}