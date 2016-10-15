import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TournamentSubCard from './TournamentSubCard';
import TournamentSubCard1 from './TournamentSubCard1';
import {Tabs, Tab} from 'material-ui/Tabs';

import restUrl from '../../restUrl';

const style = {
  marginLeft:0,
  marginBottom:20,
  marginRight:0,
  marginTop: -15
};

const tour_header={
  textAlign:'center',
  marginBottom:0,
  padding: 10
}

export default class Tournaments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTournament: [{
                          "_id": "Sports-Champ",
                          "title": "Sports Champ",
                          "endDate": {
                            "$date": "2016-09-05T18:30:00.000Z"
                          },
                          "startDate": {
                            "$date": "2016-09-01T18:30:00.000Z"
                          },
                          "description": "Lets Test Your Sports IQ",
                          "instructions": "Tournament should be played with 4 players. After clearing each level you would be allowed to play the next level. Do check leader board to see your position in the tournament.",
                          "matches": 5,
                          "playersPerMatch": 3,
                          "tournamentFollowers": 100,
                          "registration": {
                            "endDate": {
                              "$date": "2016-08-31T18:30:00.000Z"
                            },
                            "startDate": {
                              "$date": "2016-07-31T18:30:00.000Z"
                            }
                          },
                          "imageUrl": "https://quizup-questions.imgix.net/topic-icons/game-of-thrones-2014-10-30T15:00:25.551Z?fm=png\u0026q=50\u0026h=128\u0026w=128",
                          "__v": 2,
                          "topics": [{
                            "levelId": "Sports-Champ_1",
                            "topicId": "Football-Players",
                            "games": []
                          }, {
                            "levelId": "Sports-Champ_2",
                            "topicId": "Basketball-Players",
                            "games": []
                          }, {
                            "levelId": "Sports-Champ_3",
                            "topicId": "Cricket-Players",
                            "games": []
                          }, {
                            "levelId": "Sports-Champ_4",
                            "topicId": "Cricket-World-Cup",
                            "games": []
                          }, {
                            "levelId": "Sports-Champ_5",
                            "topicId": "Hockey",
                            "games": []
                          }],
                          "prizes": [{
                                        "position1": "$1000"
                                      }, {
                                        "position2": "$750"
                                      }, {
                                        "position3": "$500"
                                      }],
                          "totalGamesPlayed": 2,
                          "leaderBoard": []
                        },
                        {
                          "_id": "TV-Maniac",
                          "title": "TV Maniac",
                          "description": "Lets Test Your TV IQ",
                          "instructions": "Tournament should be played with 4 players. After clearing each level you would be allowed to play the next level. Do check leader board to see your position in the tournament.",
                          "endDate": {
                            "$date": "2016-09-10T18:30:00.000Z"
                          },
                          "startDate": {
                            "$date": "2016-09-01T18:30:00.000Z"
                          },
                          "matches": 4,
                          "tournamentFollowers": 100,
                          "registration": {
                            "endDate": {
                              "$date": "2016-08-31T18:30:00.000Z"
                            },
                            "startDate": {
                              "$date": "2016-07-31T18:30:00.000Z"
                            }
                          },
                          "playersPerMatch": 4,
                          "imageUrl": "https://quizup-questions.imgix.net/topic-icons/game-of-thrones-2014-10-30T15:00:25.551Z?fm=png\u0026q=50\u0026h=128\u0026w=128",
                          "__v": 26,
                          "topics": [{
                            "levelId": "TV-Maniac_1",
                            "topicId": "Cartoons",
                            "games": []
                          }, {
                            "levelId": "TV-Maniac_2",
                            "topicId": "Game-of-Thrones",
                            "games": []
                          }, {
                            "levelId": "TV-Maniac_3",
                            "topicId": "Lord-of-the-Rings",
                            "games": []
                          }, {
                            "levelId": "TV-Maniac_4",
                            "topicId": "Sherlock",
                            "games": []
                          }],
                          "prizes": [{
                                        "position1": "$1000"
                                      }, {
                                        "position2": "$750"
                                      }, {
                                        "position3": "$500"
                                      }],
                          "totalGamesPlayed": 21,
                          "leaderBoard": []
                        }],
      
      upcomingTournament: [{
                              "_id": "Lord-Of-Series",
                              "title": "Lord Of Series",
                              "endDate": {
                                "$date": "2016-10-05T18:30:00.000Z"
                              },
                              "startDate": {
                                "$date": "2016-10-01T18:30:00.000Z"
                              },
                              "description": "Tournament for the persons who think they know all about English TV Series",
                              "instructions": "Tournament should be played with 4 players. After clearing each level you would be allowed to play the next level. Do check leader board to see your position in the tournament.",
                              "matches": 3,
                              "playersPerMatch": 3,
                              "tournamentFollowers": 100,
                              "registration": {
                                "endDate": {
                                  "$date": "2016-09-30T18:30:00.000Z"
                                },
                                "startDate": {
                                  "$date": "2016-09-01T18:30:00.000Z"
                                }
                              },
                              "imageUrl": "https://quizup-questions.imgix.net/topic-icons/game-of-thrones-2014-10-30T15:00:25.551Z?fm=png\u0026q=50\u0026h=128\u0026w=128",
                              "__v": 0,
                              "topics": [{
                                "levelId": "Lord-Of-Series_1",
                                "topicId": "Game-of-Thrones",
                                "games": []
                              }, {
                                "levelId": "Lord-Of-Series_2",
                                "topicId": "Lord-of-the-Rings",
                                "games": []
                              }, {
                                "levelId": "Lord-Of-Series_3",
                                "topicId": "Sherlock",
                                "games": []
                              }],
                              "prizes": [{
                                        "position1": "$1000"
                                      }, {
                                        "position2": "$750"
                                      }, {
                                        "position3": "$500"
                                      }],
                              "totalGamesPlayed": 0,
                              "leaderBoard": []
                            }],
      
      completedTournament: [{
                              "_id": "Mindbusters",
                              "title": "Mindbusters",
                              "endDate": {
                                "$date": "2016-08-05T18:30:00.000Z"
                              },
                              "startDate": {
                                "$date": "2016-08-01T18:30:00.000Z"
                              },
                              "instructions": "Tournament should be played with 4 players. After clearing each level you would be allowed to play the next level. Do check leader board to see your position in the tournament.",
                              "imageUrl": "https://quizup-questions.imgix.net/topic-icons/game-of-thrones-2014-10-30T15:00:25.551Z?fm=png\u0026q=50\u0026h=128\u0026w=128",
                              "playersPerMatch": 4,
                              "matches": 3,
                              "description": "A tournament that quantifies your knowledge about topics like Sports, Business and Movies",
                              "registration": {
                                "endDate": {
                                  "$date": "2016-07-31T18:30:00.000Z"
                                },
                                "startDate": {
                                  "$date": "2016-06-30T18:30:00.000Z"
                                }
                              },
                              "topics": [{
                                "levelId": "Mindbusters_1",
                                "topicId": "T1",
                                "_id": {
                                  "$oid": "56d3d05093f04af930d47ec4"
                                },
                                "games": []
                              }, {
                                "levelId": "Mindbusters_2",
                                "topicId": "T3",
                                "_id": {
                                  "$oid": "56d3d05093f04af930d47ec3"
                                },
                                "games": []
                              }, {
                                "levelId": "Mindbusters_3",
                                "topicId": "T4",
                                "_id": {
                                  "$oid": "56d3d05093f04af930d47ec2"
                                },
                                "games": []
                              }],
                              "leaderBoard": [{
                                "userId": "a13",
                                "playerName": "a13",
                                "playerPic": "/images/userProfileImages/user.png",
                                "totalScore": 26,
                                "_id": {
                                  "$oid": "56ea681f7cce085d242371fc"
                                }
                              }, {
                                "userId": "qwerty",
                                "playerName": "qwerty",
                                "playerPic": "/images/userProfileImages/user.png",
                                "totalScore": 23,
                                "_id": {
                                  "$oid": "56ea681f7cce085d242371fd"
                                }
                              }, {
                                "userId": "sai",
                                "playerName": "sai",
                                "playerPic": "/images/userProfileImages/user.png",
                                "totalScore": 19,
                                "_id": {
                                  "$oid": "56ea681f7cce085d242371fe"
                                }
                              }, {
                                "userId": "a12",
                                "playerName": "a12",
                                "playerPic": "/images/userProfileImages/user.png",
                                "totalScore": 18,
                                "_id": {
                                  "$oid": "56ea68207cce085d242371ff"
                                }
                              }],
                              "prizes": [{
                                        "position1": "$1000"
                                      }, {
                                        "position2": "$750"
                                      }, {
                                        "position3": "$500"
                                      }],
                              "totalGamesPlayed": 6,
                              "tournamentFollowers": 6,
                              "__v": 4
                            }],      
      
      value: 'a'
    };
  }

  componentDidMount(){
    var request = $.ajax({
      url: restUrl + '/api/v1/tournaments',
      type: 'GET',
    });
    request.done(function(data) {
      console.log(JSON.stringify(data));
      var active = [];
      var completed = [];
      for(var i=0;i<data.length;i++) {
        if(data[i].isComplete=='false' || data[i].isComplete==false) {
          active.push(data[i]);
        }
      }
      for(var i=0;i<data.length;i++) {
        var levels = data[i].levels;
        var currentLevel = -1;
        for(var j=0;j<levels.length;j++) {
          if(levels[j].active=='yes') {
            currentLevel = j;
            break;
          }
        }
        if(currentLevel==-1) {
          currentLevel = levels.length;
        }
        if(currentLevel>0) {
          completed.push(data[i]);
        }
      }
      console.log('Avtive: '+JSON.stringify(active));
      console.log('Completed: '+JSON.stringify(completed));
      // this.setState({
      //   activeTournament: active,
      //   completedTournament: completed,
      // });
    }.bind(this));
    request.fail(function() {
      console.error('TournamentsContainer error');
    }.bind(this));
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  }

  render() {
    var activeTournaments = [];
    
    var upcomingTournaments = [];
    
    var completedTournaments = [];

    for (var i = 0; i < this.state.activeTournament.length; i++) {
      activeTournaments.push(
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" style={{paddingTop: '16px', paddingBottom: '16px'}}>
          <TournamentSubCard tournament={this.state.activeTournament[i]} btname="Enter Tournament"/>
        </div>
      );
    }

    for (var i = 0; i < this.state.upcomingTournament.length; i++) {
      upcomingTournaments.push(
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" style={{paddingTop: '16px', paddingBottom: '16px'}}>
          <TournamentSubCard tournament={this.state.upcomingTournament[i]} btname="Register"/>
        </div>
      );
    }

    for (var i = 0; i < this.state.completedTournament.length; i++) {
      completedTournaments.push(
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" style={{paddingTop: '16px', paddingBottom: '16px'}}>
          <TournamentSubCard tournament={this.state.completedTournament[i]} btname="LeaderBoard"/>
        </div>
      );
    }

    return (

      <div style={{width:'100%'}}>
        <Paper style={style} zDepth={2} >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange} >
            
            <Tab label="Active Tournaments" value="a" >
                
                  <div className='row' >
                    {activeTournaments}
                  </div>
              
            </Tab>
          
            <Tab label="Upcoming Tournaments" value="b" >
                
                <div className='row' >
                  {upcomingTournaments}
                </div>
            </Tab>

            <Tab label="Completed Tournaments" value="c" >
                
                <div className='row' >
                  {completedTournaments}
                </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    )
  }
}