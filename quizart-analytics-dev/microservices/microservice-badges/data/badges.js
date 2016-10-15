module.exports = [{ badgeId: "thumbsUp",
  badgeName:"Thumbs Up",
  badgeDesc:"You have got your first win. Way to go!!",
  badgeUrl:"../images/badges/bronze.png",
  badgeRule:"Win one game to get this badge",
  badgeDep:["nOfWin"],
  badgeFunct: function(nOfWin) {
    if(nOfWin==1) {return true}
      else return false;
    }
  },
  {
    badgeId:"onARoll",
    badgeName:"On a Roll",
    badgeDesc:"You are on a roll!! Keep it up!!",
    badgeUrl:"../images/badges/silver.png",
    badgeRule:"Win six consecutive games to get this badge",
    badgeDep:["nOfConsWin"],
    badgeFunct: function(nOfConsWin) {
      if(nOfConsWin>5) {return true}
        else return false
      }
  },
  {
    badgeId:"responseNinja",
    badgeName:"Response Ninja",
    badgeDesc:"Fast and Accurate. Master of discipline. Enough said!",
    badgeUrl:"../images/badges/gold.png",
    badgeRule:"Answer questions fast and precise in any game to get this badge",
    badgeDep:["avgResTimeCrctCurrentGame"],
    badgeFunct: function(avgResTimeCrctCurrentGame) {
      if(avgResTimeCrctCurrentGame < 4 && avgResTimeCrctCurrentGame > 0) {return true}
        else return false
      }
  },
  {
    badgeId:"goodHabit",
    badgeName:"Good Habit",
    badgeDesc:"You come here everyday, committed to your goal. Keep going and victory will be yours.",
    badgeUrl:"../images/badges/bronze.png",
    badgeRule:"Login five consecutive days to get this badge",
    badgeDep:["consLogin"],
    badgeFunct:function(consLogin) {
      if(consLogin>=1) {return true}
        else return false
      }
  },
  {
    badgeId:"jackOfAll",
    badgeName:"Jack Of All",
    badgeDesc:"You are knowledgable and versatile. Keep pushing your limits!!",
    badgeUrl:"../images/badges/silver.png",
    badgeRule:"Attempt games in more than 10 topics to get this badge",
    badgeDep:["nOfUniqTopicPlayed"],
    badgeFunct: function(nOfUniqTopicPlayed) {
      if(nOfUniqTopicPlayed>=10) {return true}
        else return false
      }
  },
  {
    badgeId:"inspiration",
    badgeName:"Inspiration",
    badgeDesc:"You have amazing motivation. You are an inspiration to all!!",
    badgeUrl:"../images/badges/gold.png",
    badgeRule:"Attempt 25 games to get this badge",
    badgeDep:["nOfGamePlayed"],
    badgeFunct: function(nOfGamePlayed) {
      if(nOfGamePlayed>=25) {return true}
        else return false
      }
  },
  {
    badgeId:"highFive",
    badgeName:"High Five",
    badgeDesc:"You have won 5 games!! Give me a five!! Yeah!",
    badgeUrl:"../images/badges/silver.png",
    badgeRule:"Win five games to get this badge",
    badgeDep:["nOfWin"],
    badgeFunct: function(nOfWin) {
      if(nOfWin>=5) {return true}
        else return false
      }
  },
  {
    badgeId:"wiseOne",
    badgeName:"Wise One",
    badgeDesc:"You got it all right, O wise one!! I bow to thy wisdom. Keep going!!",
    badgeUrl:"../images/badges/gold.png",
    badgeRule:"Answer all questions correctly in any game to get this badge",
    badgeDep:["nOfCrctResCurGame"],
    badgeFunct: function(nOfCrctResCurGame) {
      if(nOfCrctResCurGame==100) {return true}
        else return false
      }
  },
  {
    badgeId:"magister",
    badgeName:"Magister",
    badgeDesc:"We acknowledge your mastery and award you this. Keep winning!!",
    badgeUrl:"../images/badges/gold.png",
    badgeRule:"Win 20 games in the same topic to get this badge",
    badgeDep:["nOfWinForATopic"],
    badgeFunct: function(nOfWinForATopic) {
      if(nOfWinForATopic>=20) {return true}
        else return false
      }
  },
  {
    badgeId:"hatTrick",
    badgeName:"Hat Trick",
    badgeDesc:"That's a hat trick win!! Don't stop here, there is more to achieve!!",
    badgeUrl:"../images/badges/silver.png",
    badgeRule:"Win three consecutive games to get this badge",
    badgeDep:["nOfConsWin"],
    badgeFunct: function(nOfConsWin) {
      if(nOfConsWin==3) {return true}
        else return false
      }
  }
];
