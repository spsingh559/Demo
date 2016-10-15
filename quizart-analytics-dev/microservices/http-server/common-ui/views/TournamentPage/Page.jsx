import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import People from 'material-ui/svg-icons/social/people';
import PeopleOutline from 'material-ui/svg-icons/social/people-outline';
import Checkbox from 'material-ui/Checkbox';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import SwipeableViews from 'react-swipeable-views';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import {teal900,blue200,brown800,grey800,grey50,blue100} from 'material-ui/styles/colors';
import {grey600,grey500, grey100, red900, teal500} from 'material-ui/styles/colors';
import Cookie from 'react-cookie';
import LinearProgress from 'material-ui/LinearProgress';
import {GridList, GridTile} from 'material-ui/GridList';

import restUrl from '../../restUrl';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    textAlign: 'center',
    padding: 10,
    height:100
  },
};

const paperstyle = {
  marginLeft:0,
  marginBottom:20,
  marginRight:0,
  marginTop: 0
};


const styleImg={
  width: "100%"
}

const btnFontColor ={
  marginLeft:'12.5%',
  width:"75%"
}

const styleCard={
  width: "100%",
  padding: 15,
}

const style_followers={
    position: 'relative',
    top: -45,
    width:'5%',
    marginTop:12,
    marginBottom:0,
    float:'right',
    fontWeight:'bold',
    fontSize:'small',
    padding: 0
}
const style_favorite={
    position: 'relative',
    top: -45,
    width:'5%',
    marginTop:12,
    marginBottom:0,
    float:'right',
    fontWeight:'bold',
    fontSize:'small',
    padding: 0
}
const style_fav={
    position: 'relative',
    top: -45,
    width:'5%',
    marginTop:10,
    marginBottom:10,
    float:'right',
}
const style_sd={
    width:'10%',
    marginTop:15,
    marginBottom:10,
    float:'right',
    fontWeight:'bold',
    fontSize:'small'
}
const avatarstyle={
  margin: "5px",
  float:'left',
}

const style = {
  marginLeft:0,
  marginTop:20,
  marginBottom:20,
  marginRight:0,
};

const tour_header={
  margin:20,
  textAlign:'center',
  paddingTop:20,
}

const chip = {
    width:500
  };

  const marg={
      margin: 20
  };


export default class Page extends React.Component {
  constructor(props){
    super(props);
    console.log('Inside TournamentPage constructor: '+this.props.params.id);
    this.state = {
      rows:[],
      tournament :[{
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
                        }],


        levels: [{
                            "levelId": "Sports-Champ_1",
                            "topicId": "Football-Players",
                            "playersQualified": 1524,
                            "averageRating":1800,
                            "games": []
                          }, {
                            "levelId": "Sports-Champ_2",
                            "topicId": "Basketball-Players",
                            "playersQualified": 376,
                            "averageRating":1900,
                            "games": []
                          }, {
                            "levelId": "Sports-Champ_3",
                            "topicId": "Cricket-Players",
                            "playersQualified": 64,
                            "averageRating":1975,
                            "games": []
                          }, {
                            "levelId": "Sports-Champ_4",
                            "topicId": "Cricket-World-Cup",
                            "playersQualified": 16,
                            "averageRating":2050,
                            "games": []
                          }, {
                            "levelId": "Sports-Champ_5",
                            "topicId": "Hockey",
                            "playersQualified": 4,
                            "averageRating":2100,
                            "games": []
                          }],

      arr:[{"_id":"1","ranking":"1","name":"Sudhanshu","experience":336,"country":"http://www.thebadgecentre.co.uk/images/detailed/0/india-round-flag.png","score":1200,"avatar":"https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-04-512.png"},
                {"_id":"2","ranking":"2","name":"Bharath","experience":330,"country":"http://www.thebadgecentre.co.uk/images/detailed/0/india-round-flag.png","score":1280,"avatar":"https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-04-512.png"},
                {"_id":"3","ranking":"3","name":"Paras","experience":316,"country":"http://www.thebadgecentre.co.uk/images/detailed/0/india-round-flag.png","score":1100,"avatar":"https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-04-512.png"},
                {"_id":"4","ranking":"4","name":"Biswajit","experience":310,"country":"http://www.thebadgecentre.co.uk/images/detailed/0/india-round-flag.png","score":1100,"avatar":"https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-04-512.png"},
                {"_id":"5","ranking":"5","name":"Afreen","experience":308,"country":"http://www.thebadgecentre.co.uk/images/detailed/0/india-round-flag.png","score":1100,"avatar":"https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-04-512.png"},
                {"_id":"6","ranking":"6","name":"Kavita","experience":300,"country":"http://www.thebadgecentre.co.uk/images/detailed/0/india-round-flag.png","score":1100,"avatar":"https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-04-512.png"},
                {"_id":"7","ranking":"7","name":"Sagar","experience":296,"country":"http://www.thebadgecentre.co.uk/images/detailed/0/india-round-flag.png","score":1100,"avatar":"https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-04-512.png"}
            ],
            
      showCheckboxes: false,



      slideIndex:0
    };
  }

  static get contextTypes(){
    return {
      router: PropTypes.object.isRequired
    }
  }

handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  }

handlePlay(){
  console.log("Play Starts !!");
}

  // componentDidMount() {
  //   var request = $.ajax({
  //     url: restUrl + '/api/v1/tournaments/'+this.props.params.id,
  //     type: 'GET',
  //   });
  //   request.done(function(data) {
  //     console.log(JSON.stringify(data));
  //     var levels = data.levels;
  //     var currentLevel = -1;
  //     for(var i=0;i<levels.length;i++) {
  //       if(levels[i].active=='yes') {
  //         currentLevel = i;
  //         break;
  //       }
  //     }
  //     if(currentLevel==-1) {
  //       currentLevel = levels.length;
  //     }
  //     this.setState({rows:data.levels[currentLevel-1].leaderboard});
  //   }.bind(this));
  //   request.fail(function() {
  //     console.error('LeaderBoard error');
  //   }.bind(this));
  // }

  render(){
    console.log("state data: "+JSON.stringify(this.state.rows));
    
    var row = [];

    var levelDetails = [];

    var chips=this.state.arr.map(function(d){
            return(
                <TableRow displayRowCheckbox={false}>
                    <TableRowColumn style={{textAlign:'center'}}><Avatar>{d.name.toString().charAt(0)}</Avatar></TableRowColumn>
                    <TableRowColumn style={{textAlign:'center'}}><lead style={{fontSize:16}}>{d.ranking}</lead></TableRowColumn>
                    <TableRowColumn style={{textAlign:'center'}}><lead style={{fontSize:16}}>{d.name}</lead></TableRowColumn>
                    <TableRowColumn style={{textAlign:'center'}}><lead style={{fontSize:16}}>{d.experience}</lead></TableRowColumn>
                    <TableRowColumn style={{textAlign:'center'}}><Avatar src={d.country} /></TableRowColumn>
                    <TableRowColumn style={{textAlign:'center'}}><lead style={{fontSize:16}}>{d.score}</lead></TableRowColumn>
                </TableRow>
                );
        });

    for (var i = 0; i < this.state.tournament[0].topics.length; i++) {
      levelDetails.push(
        <div className='row'>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{padding:0}}>
          <Card zDepth={2}>
              <CardHeader
                title={this.state.tournament[0].topics[i].levelId}
                avatar="http://lorempixel.com/600/337/nature/"
                subtitle={this.state.tournament[0].topics[i].topicId}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <center>
                 <CardActions>
                  <FlatButton label={this.state.levels[i].playersQualified} />
                  <FlatButton label={this.state.levels[i].averageRating} />
                </CardActions>
              </center>
              <CardText expandable={true}>
                <Table style={{}} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{background:blue100}}>
                    <TableRow style={{textAlign:'center'}}>
                        <TableHeaderColumn style={{textAlign:'center',color:brown800,fontSize:20}}>Player</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:'center',color:brown800,fontSize:20}}>Ranking</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:'center',color:brown800,fontSize:20}}>Name</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:'center',color:brown800,fontSize:20}}>Experience</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:'center',color:brown800,fontSize:20}}>Country</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:'center',color:brown800,fontSize:20}}>Score</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true}>
                    {chips}
                </TableBody>
            </Table>
              </CardText>
            </Card>

            <p />
        </div>
        </div>
      );
    }


    // const style = {margin: 5, marginLeft: 0, marginRight: 0, left: 0};
    // for (var i = 0; i < this.state.rows.length; i++) {
    //   row.push(
    //     <TableRow>
    //       <TableRowColumn>{i+1}</TableRowColumn>
    //       <TableRowColumn>
    //         <ListItem
    //           disabled={true}
    //           leftAvatar={
    //             <Avatar
    //               src="https://s31.postimg.org/qgg34o597/nature.jpg"
    //               size={30}
    //               style={style}
    //             />
    //           }
    //         >
    //         <div onClick={this.handleProfile.bind(this, this.state.rows[i].userId)}>{this.state.rows[i].userId}</div>
    //         </ListItem>

    //       </TableRowColumn>
    //       <TableRowColumn>{this.state.rows[i].score}</TableRowColumn>
    //     </TableRow>
    //   );
    // }


               




    return (
        <div >
          <div className='row' style={{padding:0}}>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{padding:0,marginLeft:0,marginTop:0}}>
              <Card style={styleCard} zDepth={2}>
                <CardHeader
                  title={this.state.tournament[0].title}
                  avatar="http://lorempixel.com/600/337/nature/"
                  style={{padding: 0}}
                  titleStyle={{marginTop:10}}
                />

                <p style={style_favorite}>{this.state.tournament[0].tournamentFollowers}</p>

                <Checkbox
                  checkedIcon={<ActionFavorite />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  style={style_fav}
                  iconStyle={{fill: '#B71C1C'}}
                />

                <p style={style_followers}>12 </p>

                <Checkbox
                  checkedIcon={<People />}
                  uncheckedIcon={<PeopleOutline />}
                  style={style_fav}
                  iconStyle={{fill: '#009688'}}
                  />

                <CardMedia style={{padding: 0}} overlay={<CardTitle style={{textAlign: "center"}} subtitle="Average Rating   1800" />}>
                  <img src="https://s32.postimg.org/twb81njgl/quizwar.jpg" style={styleImg} />
                </CardMedia>
              
              </Card>
            </div>


            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{padding:0}}>
            <Paper style={style} zDepth={2} >
              <Tabs
                onChange={this.handleChange}
                value={this.state.slideIndex}
              >
                <Tab icon={<FontIcon className="muidocs-icon-description"></FontIcon>} label="Description" value={0} />
                <Tab icon={<FontIcon className="muidocs-icon-playlist_add_check"></FontIcon>} label="Instructions" value={1} />
                <Tab icon={<FontIcon className="muidocs-icon-attach_money"></FontIcon>} label="Prizes" value={2} />
              </Tabs>
              <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange} >
                  <div style={styles.slide}>
                    {this.state.tournament[0].description} 
                    </div>

                <div style={styles.slide}>
                {this.state.tournament[0].instructions}
                </div>
                <div style={styles.slide}>
                <center>
                1st Place : {this.state.tournament[0].prizes[0].position1}<br />
                2nd Place : {this.state.tournament[0].prizes[1].position2}<br />
                3rd Place : {this.state.tournament[0].prizes[2].position3}
                </center>
                </div>
              </SwipeableViews>
              
              <center>
              <RaisedButton  style={{marginTop: 20, marginBottom:15}} label="Play" primary={true}  onClick={this.handlePlay} />
              </center>

              </Paper>
            </div>
          </div>
          
          

          <div>
            {levelDetails}
          </div>

      </div>
    );
  }
}
