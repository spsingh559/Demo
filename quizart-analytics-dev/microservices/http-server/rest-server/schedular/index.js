var context = require('../context');
var mesh = context.mesh;
var count = 0;
var CronJob = require('cron').CronJob;

var cronJob = function() {
  if(count == 0) {
    var job = new CronJob('0 */1 * * * *', function() {
      console.log('\n\nSchedular job started!!!');
      console.log('Count is: '+count);
      console.log('\n\n');
      count++;
        mesh.act('role:tournaments,cmd:retrieveActive', function(err, response) {
          if(err) { console.error('===== ERR: ', err, ' ====='); return; }
          if(response.response !== 'success') { return; }
          var tournaments = response.entity;
          var date = (new Date()).getTime();

          for(var i=0;i<tournaments.length;i++) {
            console.log(JSON.stringify(response.entity));
            var levels = tournaments[i].levels;
            var currentLevel = -1;
            for(var j=0;j<levels.length;j++) {
              if(levels[j].active=='yes') {
                currentLevel = j;
                break;
              }
            }
            if(currentLevel == -1) {
              currentLevel = tournaments[i].levels.length-1;
            }
            console.log('Current Level is: '+currentLevel);
            var endDate = new Date(tournaments[i].levels[currentLevel].tourEndDate).getTime();
            if(date>endDate) {
              mesh.act('role:tournaments,cmd:updateWinners',{id:tournaments[i]._id}, function(err, response) {
                if(err) { console.error('===== ERR: ', err, ' ====='); return; }
                //if(response.response !== 'success') { return; }
                console.log('Step 2 completed');
                if(!response.entity.isComplete) {
                  mesh.act('role:tournaments,cmd:registerPlayersHigherLevels',{id:response.entity._id}, function(err, response) {
                    if(err) { console.error('===== ERR: ', err, ' ====='); return; }
                    if(response.response !== 'success') { return; }
                    console.log('\n\n\n\n\nStep 3 completed:');
                    console.log(JSON.stringify(response.entity));
                    console.log('\n\n\n\n\n');
                  });
                }
              });
            }
          }
        });
      }, function () {
        /* This function is executed when the job stops */
    	console.log('Final!!!');
      },
      true /* Start the job right now */
    );
  }
}

exports = module.exports = cronJob;
