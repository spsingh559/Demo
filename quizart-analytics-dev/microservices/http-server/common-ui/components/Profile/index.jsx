import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import loginForm from '../LoginForm'
import base64 from 'base-64';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper'
import {Link} from 'react-router';
import MediaQuery from 'react-responsive';

import restUrl from '../../restUrl';

import Badges from './../BadgesCard/index.jsx';
import FavoriteTopics from './../FavoriteTopics/index.jsx';
import ProfileAnalytics from './../ProfileAnalytics/index.jsx';
import WinsVsLoss from './../WinsVsLoss/index.jsx';




const card3={
  height:'300%',
marginLeft:180,
marginRight:350
};

const style1 = {
  height: 90,
  width: 90,
  margin: 0,
  textAlign: 'center',
  display: 'inline-block',
};

const stylePopular = {
  textAlign: 'center',
};

const style = {
  borderLeft : 2,
  borderRight : 0,
  borderTop : 0,
  borderBottom : 0,
  borderStyle : 'solid',
  borderColor : 'lightgrey',
  textAlign : 'center',
  color : 'grey',
};

const styles = {
  textAlign : 'center',
  color : 'grey',
};

const styleCard = {
  borderRadius : 5,
  textAlign:'center',
  marginTop:-270,
  float:'right',
  marginBottom:-20

};

export default class Profile extends React.Component{

  constructor(props){
    super(props);
    console.log("Inside Constructor of Profile Page===",this.props.username);
    this.state = { data:[],
      name: "",
      useravatar: "http://lorempixel.com/100/100/nature/",
      age: "",
      country: "",
      open: false,
      arr:[],
      uid:this.props.username,
      uuid:"",
      Profile: {
        username: JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub,
      },
      openFailed: false,
      openSuccess: false,
      disable: false,
      addFriend: "Add Friend"
    }
  };

//   loadDataFromServer()
// {
//   console.log(this.props.username+"Bharath");
//    $.ajax(
//       {
//       url: restUrl + '/api/v1/analytics/user/'+this.props.username+'/winloss',
//       type: 'GET',
//       dataType:'JSON',
//       success:function(dataArr)
//       {
//         console.log(dataArr);
//         this.setState({data: dataArr});
//         console.log(this.state.data[0].count);
//         console.log(this.state.data[1].count);
//       }.bind(this),
//       error:function(err)
//       {
//         console.error('err');
//       }.bind(this)
//       });

// };

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }


  handleName(event) {
    this.setState({name: event.target.value});
  };

  handleImg(event) {
    this.setState({useravatar: event.target.value});
  };

  handleAge(event) {
    this.setState({age: event.target.value});
  };

  handleCounry(event) {
      this.setState({country: event.target.value});
    };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit(){

        var profileData = {
          username: this.state.Profile.username,
          name: this.state.name,
          useravatar: this.state.useravatar,
          age: this.state.age,
          country: this.state.country
        };

        var request = $.ajax({
        url: restUrl + '/api/v1/profile',
        type: 'PUT',
        data: JSON.stringify(profileData),
        contentType: 'application/json',
        });

        request.done(function(data) {
          this.setState({openSuccess: true});
        }.bind(this));
        request.fail(function() {
            console.log("Cannot Edit");
            this.setState({openFailed: true});
          }.bind(this));

          this.setState({
            open:false
          });
        console.log("Submitted");

        }


        addFriend(){

           this.getUuid();

         }

        getUuid(){

          var d = new Date().getTime();
          var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = (d + Math.random()*16)%16 | 0;
              d = Math.floor(d/16);
              return (c=='x' ? r : (r&0x3|0x8)).toString(16);
          });
          var requestMsg ={
            message : {content: uuid, command : 'generateUUID'},
            details : {subject :[this.state.Profile.username,this.props.username]}
          };
          console.log("Request Message is ",requestMsg);

          var topicid ;

            var request = $.ajax({
            url: restUrl + '/api/generateuuid/uuid',
            type : 'POST',
            data : JSON.stringify(requestMsg),
            contentType: 'application/json',
            });
            request.done(function(data) {
              topicid = data.result.message.content;
              var friendsData = {
                subject: [this.state.Profile.username,this.props.username],
                relation: "friends",
                object: [this.state.topicid],
                };
                this.add({"friendsInfo":friendsData});

            }.bind(this));
            request.fail(function() {
            console.error('err');
            }.bind(this));

          }

        add(friendsInfo){

          friendsData = friendsInfo.friendsInfo;

            var request = $.ajax({
              url: restUrl + '/api/v1/friend',
              type: 'POST',
              data: JSON.stringify(friendsData),
              contentType: 'application/json',

            });
            request.done(function(data) {
              console.log(JSON.stringify(data));
              console.log("Added As Friend");
              this.setState({
                disable:true,
                addFriend: "Friends"
              });
            }.bind(this));
            request.fail(function() {
                console.log("Error sending Friend request");
              }.bind(this));
          }

  componentDidMount(){
    // this.loadDataFromServer();
    console.log("uid",this.state.uid);
    var request = $.ajax({
    url: restUrl + '/api/v1/profile/'+this.state.uid,
    type: 'GET',
    contentType: 'application/json',
    });
    request.done(function(data) {
    this.setState({arr: data});
    }.bind(this));
    request.fail(function() {
    console.error('Profile err');
    }.bind(this));

  };

  handleSuccessClose() {
    this.context.router.push('/ProfilePage/'+this.props.username);
    this.setState({openSuccess:false});
  }

  handleFailClose() {
    this.setState({openFailed: false});
  }

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ];

    const failDialogActions = [
      <FlatButton
        label="Retry"
        primary={true}
        onTouchTap={this.handleFailClose.bind(this)} />
    ];
    const successDialogActions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleSuccessClose.bind(this)} />
    ];




    if(this.state.arr === [] || this.state.arr == null || this.state.arr[0] == undefined)
    { return (<div><p>Loading...........</p></div>) }
    else{
      return(
        <div>
          <img src='http://www.melanze.co.in/wp-content/uploads/2016/03/photography-quiz-hd-background-9-hd-wallpapers-1080x300.jpg' width="100%"/>
                
                <MediaQuery query='(min-device-width: 600px)'>
                  <MediaQuery query='(min-width: 600px)'>
                   <center>
                   <Avatar size={100} style={{margin: '-120px 0px 10px 0px'}}
                             src="http://icons.iconarchive.com/icons/designbolts/free-male-avatars/128/Male-Avatar-Cool-Sunglasses-icon.png"
                           />
                           </center>
                   </MediaQuery>
                </MediaQuery> 
                <MediaQuery query='(min-device-width: 800px)'>
                  <MediaQuery query='(min-width: 800px)'>
                     <center>
                      <Avatar size={180} style={{margin: '-120px 0px 10px 0px'}}
                             src="http://icons.iconarchive.com/icons/designbolts/free-male-avatars/128/Male-Avatar-Cool-Sunglasses-icon.png"
                           />
                           </center>
                  </MediaQuery>
                </MediaQuery> 
                

                 <RaisedButton
                    primary={true}
                   style={{margin: '-135px 0px 10px 0px',float:'right'}}
                    icon={<FontIcon style={{cursor:'pointer'}} className="muidocs-icon-image-edit"/>}
                    onTouchTap={this.handleOpen}
                    />
                <center>
                    <h1>{this.state.arr[0].name.split(' ')[0]}</h1>
                    <h1>{this.state.arr[0].name.split(' ')[1]}</h1>

                        <h4>{this.state.arr[0].category}</h4>
                      <h4>{this.state.arr[0].age},
                     {this.state.arr[0].country}
                
                </h4>
                
              </center>
              <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" >
               </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" >
                {
                  ((this.state.Profile.username)===(this.state.uid)) ? (
                    <div>
                    
                    <Dialog
                      title="Edit Profile"
                      actions={actions}
                      modal={true}
                      autoDetectWindowHeight={true}
                      autoScrollBodyContent={true}
                      open={this.state.open}
                      onRequestClose={this.handleClose}
                    >
                    <div >
                    <TextField
                      hintText="userName"
                      floatingLabelText="UserName"
                      fullWidth={true}
                      value={this.state.Profile.username}
                    /><br />
                    <TextField
                      hintText="Name"
                      floatingLabelText="Name"
                      fullWidth={true}
                      defaultValue={this.state.arr[0].name}
                      onChange={this.handleName.bind(this)}
                    /><br />
                      <TextField
                        hintText="Avatar Image"
                        floatingLabelText="Avatar Image"
                        fullWidth={true}
                        defaultValue={this.state.useravatar}
                        onChange={this.handleImg.bind(this)}
                      /><br />
                      <TextField
                        hintText="Age"
                        floatingLabelText="Age"
                        fullWidth={true}
                        defaultValue={this.state.arr[0].age}
                        onChange={this.handleAge.bind(this)}
                      /><br />
                      <TextField
                        hintText="Country"
                        floatingLabelText="Country"
                        fullWidth={true}
                        defaultValue={this.state.arr[0].country}
                        onChange={this.handleCounry.bind(this)}
                      /><br />
                      </div>
                    </Dialog>
                    </div>
                  ): (
                    <RaisedButton
                        label={this.state.addFriend}
                        primary={true}
                        disabled = {this.state.disable}
                        style={{marginTop: 50}}
                        icon={<FontIcon style={{cursor:'pointer'}} className="muidocs-icon-social-person_add"/>}
                        onTouchTap={this.addFriend.bind(this)}
                    />
                  )
                }
                <Dialog
                  title="Unsuccessful"
                  actions={failDialogActions}
                  modal={true}
                  open={this.state.openFailed}>
                  Couldnt Edit your profile. Please try again.
                </Dialog>
                <Dialog
                  title="Profile Edited"
                  actions={successDialogActions}
                  modal={true}
                  open={this.state.openSuccess}>
                  Profile edited successfully!
                </Dialog>
              </div>
            </div>
            <br/>
          <div className="row">
          <MediaQuery query='(max-device-width: 600px)'>
            <MediaQuery query='(max-width: 600px)'>
                   
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
              <ProfileAnalytics userid={this.props.username}/>
          </div>
          </MediaQuery>
                </MediaQuery> 

                <MediaQuery query='(min-device-width: 800px)'>
                  <MediaQuery query='(min-width: 800px)'>
                  <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5" style={styleCard}>
                      <ProfileAnalytics userid={this.props.username}/>
                  </div>
                  </MediaQuery>
                </MediaQuery> 
          <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2" style={styleCard}>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5" style={styleCard}>
          
          <Badges/>
          </div>
          </div>
          <br/>
          <br/>
            <WinsVsLoss allData={this.state.data}/>
        <br/>
          <div style={{textAlign:'center'}}>
          <FavoriteTopics userid={this.props.username}/>
          </div>
        </div>
      );

    }

  }
}