import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import People from 'material-ui/svg-icons/social/people';
import PeopleOutline from 'material-ui/svg-icons/social/people-outline';
import {grey600,grey500, grey100, red900, teal500} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import base64 from 'base-64';
import {PropTypes} from 'react';

import SwipeableTabs from './SwipeTabs';
import SwipeableViews from 'react-swipeable-views';
import restUrl from '../../restUrl';


var title1={
      width: '45%',
      paddingRight:"0px",
      marginTop: "10px",
      marginBottom: "0px",
      float: 'left',
}
const styleImg={
  height: "250px",
  width: "100%"
}

const btnFontColor ={
  marginLeft:'12.5%',
  width:"75%"
}

const styleCard={
  width: "80%", 
  marginTop:20,
  marginLeft : 50,
  padding: 15
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

class TournamentsSubCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      finished: false, active: false,
      label:'',
      //username: JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub,
    };
  }

  static get contextTypes(){
    return {
      router: PropTypes.object.isRequired
    }
  }

  // handleLeaderboard = () => {
  //   this.context.router.push('/tournamentboard/'+this.props.tournament._id);
  // }

  handleNext = () => {
    if(this.state.label==='Register' || this.state.label==='REGISTER') {
      var request = $.ajax({
        url: restUrl + '/api/v1/tournaments/registerPlayer',
        type: 'PUT',
        data: JSON.stringify({id: this.props.tournament._id, userId: this.state.username}),
        contentType: 'application/json'
      });
      request.done(function(data) {
        console.log('PUT success' + JSON.stringify(data));
        this.setState({
          finished: true,
          label: 'Registered',
        });
      }.bind(this));
      request.fail(function() {
        this.setState({
          error: true
        });
      }.bind(this));
    }
    
    // else if(this.state.label==='Play' || this.state.label==='PLAY') {
    //   this.context.router.push('/quiz/true/'+this.props.tournament._id);
    // }
    else{
      this.context.router.push('/tournamentpage/'+this.props.tournament._id);
    }
  };

  // currentLevel(retrievedTournament) {
  //   var levels = retrievedTournament.levels;
  //   var currentLevel = -1;
  //   for(var i=0;i<levels.length;i++) {
  //     if(levels[i].active=='yes') {
  //       currentLevel = i;
  //       break;
  //     }
  //   }
  //   if(currentLevel == -1) {
  //     currentLevel = levels.length-1;
  //   }
  //   return currentLevel;
  // }

  // handleDates = () => {
  //   var currentLevel = this.currentLevel(this.props.tournament);

  //   console.log('Inside handleDates sub card: Level is '+currentLevel);
  //   var date = new Date();
  //   var regEndDate = new Date(this.props.tournament.regEndDate);
  //   var tourEndDate = new Date(this.props.tournament.levels[currentLevel].tourEndDate);
  //   var tourStartDate = new Date(this.props.tournament.levels[currentLevel].tourStartDate);
  //   var alreadyPlayedGame = false;
  //   var alreadyRegistered = false;
  //   for(var i=0;i<this.props.tournament.levels[currentLevel].registeredPlayers.length;i++) {
  //     var obj = this.props.tournament.levels[currentLevel].registeredPlayers[i];
  //     if(this.state.username==obj.userId) {
  //       alreadyRegistered = true;
  //       break;
  //     }
  //   }
  //   for(var i=0;i<this.props.tournament.levels[currentLevel].games.length;i++) {
  //     var arr = this.props.tournament.levels[currentLevel].games[i];
  //     for(var j=0;j<arr.length;j++) {
  //       if(this.state.username==arr[j].userId) {
  //         alreadyPlayedGame = true;
  //         break;
  //       }
  //     }
  //     if(alreadyPlayedGame) {
  //       break;
  //     }
  //   }

  //   console.log(date);
  //   console.log(regEndDate);
  //   console.log((regEndDate instanceof Date)+" "+(typeof regEndDate === "string"));
  //   console.log((tourEndDate instanceof Date)+" "+(typeof tourEndDate === "string"));
  //   // console.log(date.getTime()<tourEndDate.getTime());

  //   if(currentLevel+1===1) {
  //     if(date.getTime()>tourStartDate.getTime() && date.getTime()<tourEndDate.getTime()) {
  //       this.setState({active: true});
  //       if(alreadyRegistered) {
  //         if(alreadyPlayedGame) {
  //           this.setState({label:'Game Completed', finished: true});
  //         } else {
  //           this.setState({label:'Play', finished: false});
  //         }
  //       } else {
  //         this.setState({label:'Not Registered', finished: true});
  //       }
  //     } else if(date.getTime()<regEndDate.getTime()) {
  //       if(alreadyRegistered) {
  //         this.setState({label:'Registered', finished: true});
  //       } else {
  //         this.setState({label:'Register', finished: false});
  //       }
  //     } else {
  //       if(alreadyRegistered) {
  //         this.setState({label:'Registered', finished: true});
  //       } else {
  //         this.setState({label:'Not Registered', finished: true});
  //       }
  //     }
  //     if(date.getTime()>tourStartDate.getTime() && date.getTime()<tourEndDate.getTime() && date.getTime()<regEndDate.getTime()) {
  //       if(alreadyRegistered) {
  //         if(alreadyPlayedGame) {
  //           this.setState({label:'Game Completed', finished: true});
  //         } else {
  //           this.setState({label:'Play', finished: false});
  //         }
  //       } else {
  //         this.setState({label:'Register', finished: false});
  //       }
  //     }
  //   } else {
  //     if(date.getTime()<tourStartDate.getTime()) {
  //       if(alreadyRegistered) {
  //         this.setState({label:'Registered', finished: true});
  //       } else {
  //         this.setState({label:'Eliminated', finished: true});
  //       }
  //     } else if(date.getTime()<tourEndDate.getTime()) {
  //       this.setState({active: true});
  //       if(alreadyRegistered) {
  //         if(alreadyPlayedGame) {
  //           this.setState({label:'Game Completed', finished: true});
  //         } else {
  //           this.setState({label:'Play', finished: false});
  //         }
  //       } else {
  //         this.setState({label:'Eliminated ', finished: true});
  //       }

  //     } else {
  //       console.log('Coming here2');
  //     }
  //   }
  //   console.log('Here:' + this.state.label);
  // }

  // componeneDidMount() {
  //   console.log('Inside componeneDidMount sub card');
  // }

  // componentWillMount() {
  //   console.log('Inside componentWillMount sub card');
  //   this.handleDates();
  // }

  render (){
  // const {finished} = this.state;
  // const {active} = this.state;
   return(
     <Card style={styleCard}>
          <CardHeader
            title={this.props.tournament.title}
            avatar="http://lorempixel.com/600/337/nature/"
            style={{padding: 0}}
            titleStyle={{marginTop:10}}
          />

          <p style={style_favorite}>{this.props.tournament.tournamentFollowers}</p>

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

          <CardMedia overlay={<CardTitle style={{textAlign: "center"}} subtitle="Average Rating   1800" />}>
            <img src={this.props.tournament.imageUrl} style={styleImg} />
          </CardMedia>

          <SwipeableTabs tournament={this.props.tournament} />

          <CardActions style={{padding:0}}>
            <RaisedButton label={this.props.btname} secondary={true} fullWidth={true} onClick={this.handleNext} />
          </CardActions>
          
          </Card>

);
}
}
export default TournamentsSubCard;