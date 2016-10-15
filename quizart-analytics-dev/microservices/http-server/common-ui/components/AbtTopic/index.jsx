import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {grey600,grey500, grey100, red900, teal500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import restUrl from '../../restUrl'
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import Cookie from 'react-cookie';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';
import People from 'material-ui/svg-icons/social/people';
import PeopleOutline from 'material-ui/svg-icons/social/people-outline';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {teal900,blue200,brown800,grey800,grey50,blue100} from 'material-ui/styles/colors';
import LeaderBoardRecord from './../LeaderBoardRecord/index.jsx';
import ConfidenceLevel from './../ConfidenceLevel/index.jsx';
import {Link,Router} from 'react-router';


const TitleStyle={
  fontSize:"1em",
    width:"100%",
  fontWeight:"1em"
}

const SubtitleStyle={
  fontSize:"0.8em",
    width:"100%"
}
var style1= {
  margin:"5px",

}
var imgStyle={
  height:"50%",
  margin:"auto"
}

const BtnStylePlay ={
  marginLeft:350
}
const BtnStyleInvite ={
  marginLeft:20
}

var style1= {
  background:'#c6ecc6'
}

var cardDivStyle={
   margin:0,
}

var title1={
    paddingLeft:10,
    paddingTop:10,
    marginBottom:5
}
var title2={
  paddingLeft:10,
  marginTop:10,
  marginBottom:10,
  height:'30px'
}
var title3={
    textAlign:'center',
    margin:'auto',
    width:'60%',
    color:'white'
}
var title4={
     width:"30%",
     margin:'auto'
}

const style_fav={
    width:'5%',
    float:'right',
    marginTop:20
}
const style_followers={
    width:'12%',
    float:'right',
    fontWeight:'bold',
    fontSize:'small',
    cursor:'pointer',
    marginTop:20

}
const style_favorite={
    width:'10%',
    float:'right',
    fontWeight:'bold',
    fontSize:'small',
    cursor:'pointer',
    marginTop:20

}
const iconStyles = {
  marginRight: 24,
  height:60,
  width:60,
}

const style_players={
  marginRight:20,
  float:'right',
  color:'white',
  }

  const card={
  height:1770,
  overflow:'auto'
  }

  const cover={
    width:'100%'
  }
  const pro={
  marginTop: -120,
  zIndex : 1
  }

  var heading={
    textAlign:'center'    
  }

  const divstyle = {
    
    textAlign : 'center',
    color : 'grey',
    marginLeft:60
    
    }

  const imgsize={
    height:400
  }

  const card2={
    marginTop:20,
    marginBottom:20
  }

  const card3={
    textAlign:'center',
    padding:20
  }
  const div1={
  }
  const progress={
    height:15,
    width:'96%',
    textAlign:'center',
    
    borderRadius:20,
    marginRight:30,
    marginTop:10
  }
  
  const tableLeft={
    
  }
  const tableLeft2={
    
  }

  export default class AbtTopic extends React.Component {
    constructor(){
      super();
      this.state = {
            arr:[{"_id":"Cartoons","topicName":"Cartoons","topicIcon":"https://quizup-questions.imgix.net/topic-icons/retro-cartoons-2014-10-31T11:32:46.062Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"What's up, Mickey?","topicFollowers":9550,"playersPerMatch":3,"topicCategory":"TV","__v":0}],
      }
    };

    handleClike(tId){
      Cookie.save("topicId",tId);
      console.log('function called handleClike');
      this.context.router.push({
        pathname:'/quiz'
      })
    }

    componentDidMount(){



      var request = $.ajax({
      url: restUrl + '/api/v1/topic/'+this.props.id,
      type: 'GET',
      });
      request.done(function(data) {
      console.log(JSON.stringify(data));
      //this.setState({arr: data});
      }.bind(this));
      request.fail(function() {
      console.error('err');
      }.bind(this));
    }
    

    handleOnCheck(topicId) {
    console.log(">>>>>>>>...handleOnCheck");
    this.state.incre=-this.state.incre;
    var sum = this.state.no+this.state.incre;
    this.setState({no:sum})
    var topic = this.props.topic;
    topic.topicFollowers = sum;
    this.props.fun(topicId,topic);
    }

    contextTypes: {
    router : React.PropTypes.object;
    }

    handleQuizwarTouch(event) {
    event.preventDefault();
    var condition = false;
    var id = 'dummyId';
    var data = {isTournament:true, id:'dummy'};
    this.context.router.push('/quiz/false/dummy');
    /* this.context.router.push({
      pathname: '/quiz',
      query: data,
      state: data
    }); */
  }

    render(){
      if(this.state.arr === [] || this.state.arr == null || this.state.arr[0] == undefined)
      { return (<div><p>Loading...........</p></div>) }
      else{
      return(
      <div>
            <Card zDepth={3} style={{padding:3}}>
              <img src="http://www.hdwlp.com/wp-content/uploads/2016/08/Pixars-up-Cartoon-wide-851x315.jpg" style={cover}/>
                      <GridTile
                        key='d'
                        title='Topic Category'
                        subtitle={this.state.arr[0].topicCategory}
                        style={{height:140,width:'20%',float:'left',position:'absolute',marginLeft:60}}
                      ></GridTile>

                      <GridTile
                        key='e'
                        title='Current players playing'
                        subtitle='3456'
                        style={{height:140,width:'20%',float:'right',position:'absolute',marginLeft:850}}
                      ></GridTile>

                      
                      
            <center>
                    
              <RaisedButton primary={true} style={{backgroundColor:'#00BFA5'}} label="Invite" onClick={this.handleClike.bind(this,this.props.id)} />
              <Avatar size={200} zDepth={4} style={pro} elevation='10dp' src="http://hdfreewallpaper.net/wp-content/uploads/2015/12/hd-cartoons-free-wallappers-for-desktop.jpg"/>
              <RaisedButton zDepth={1} primary={true} style={{backgroundColor:'#00BFA5'}} label="Play" onClick={this.handleClike.bind(this,this.props.id)} />
            

            <h1 style={heading}>{this.props.id}</h1>
            <h3 style={heading}>{this.state.arr[0].topicDescription}</h3>

            <p style={{}}>
            <table style={{width:20}}>
            <tr style={{textAlign:'center'}}>
              <td><Checkbox
                checkedIcon={<People />}
                uncheckedIcon={<PeopleOutline />}
                iconStyle={{fill: '#009688'}}
                /></td>
              <td><small>21653</small></td>
              <td><Checkbox
                  checkedIcon={<ActionFavorite />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  iconStyle={{fill: '#B71C1C'}}
                  
                /></td>
              <td><small>{this.state.arr[0].topicFollowers}</small></td>
                </tr>
                </table>
            </p>
            </center>

            </Card>

            <div className="row"> 
              <div style={div1} className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <ConfidenceLevel/>
              </div>
              
              <div style={div1} className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <Card style={{zIndex:-1,marginTop:20,padding:10,height:349}} zDepth={3}>
                  <CardHeader
                    title="Details"
                    subtitle="Showing details of current topic"
                    avatar={this.state.arr[0].topicIcon}
                  />
                      <GridTile
                        key='d'
                        title='Details'
                        subtitle={<div>You are about to play a Cartoon Quiz Game!The most awesome CARTOONS packed into ONE game!</div>}
                        style={{height:70,width:'100%',marginBottom:3,marginTop:10}}
                      ></GridTile>
                  
                      <GridTile
                        key='a'
                        title='Total match'
                        subtitle='800'
                        style={{height:70,width:'49%',float:'left',marginRight:5}}
                      ></GridTile>

                      <GridTile
                        key='b'
                        title='Experience'
                        subtitle='1200'
                        style={{height:70,width:'50%',float:'left',marginBottom:3}}
                      ></GridTile>

                      <GridTile
                        key='c'
                        title='Win vs Loss Progress'
                        subtitle={<LinearProgress mode="determinate" value='70' style={progress}/>}
                        style={{height:70,width:'100%'}}
                      ></GridTile>
                   
                  
                    
                  

                </Card>

              </div>
            </div>
            
            <LeaderBoardRecord topicid={this.props.id}/>

        </div>
      );
    }
    }

  }