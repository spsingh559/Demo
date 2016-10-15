import React from 'react';
import ReactDOM from 'react-dom';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NotificationComponent from './NotificationComponent.jsx';
// var socket = io();
// injectTapEventPlugin();

var data1=[
{
      "id": 0,
      "NotificationId": 1,
      "NotificationOwnerId": 1001,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Friend Request",
      "NotificationSubTitle": "has send Friend request",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationStatustext": "You have Rejected",
      "notificationResultStatus": "NoStatus"
    },
    {
      "id": 1,
      "NotificationId": 2,
      "NotificationOwnerId": 1002,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Tournament Participation",
      "NotificationSubTitle": "has sent Invitation for Playing Tournament",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationStatustext": "You have Accepted",
      "notificationResultStatus": "NoStatus"
    },
    {
      "id": 2,
      "NotificationId": 3,
      "NotificationOwnerId": 1002,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Private Game Invitation",
      "NotificationSubTitle": "has sent Game invitation",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationResultStatus": "NoStatus",
      "notificationStatustext": "You have Accepted"
    },
    {
      "id": 3,
      "NotificationId": 4,
      "NotificationOwnerId": 1001,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Chat Invitation",
      "NotificationSubTitle": "has sent Chat Invitation",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationResultStatus": "NoStatus",
      "notificationStatustext": "You have Accepted"
    },
    {
      "id": 4,
      "NotificationId": 1,
      "NotificationOwnerId": 1001,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Friend Request",
      "NotificationSubTitle": "has send Friend request",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationStatustext": "You have Rejected",
      "notificationResultStatus": "NoStatus"
    },
    {
      "id": 5,
      "NotificationId": 2,
      "NotificationOwnerId": 1002,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Tournament Participation",
      "NotificationSubTitle": "has sent Invitation for Playing Tournament",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": false,
      "notificationStatustext": "You have Accepted",
      "notificationResultStatus": true
    },
    {
      "id": 6,
      "NotificationId": 3,
      "NotificationOwnerId": 1002,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Private Game Invitation",
      "NotificationSubTitle": "has sent Game invitation",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": false,
      "notificationResultStatus": false,
      "notificationStatustext": "You have Rejected"
    },
    {
      "id": 7,
      "NotificationId": 4,
      "NotificationOwnerId": 1001,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Chat Invitation",
      "NotificationSubTitle": "has sent Chat Invitation",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationResultStatus": "NoStatus",
      "notificationStatustext": "You have Rejected"
    },
    {
      "id": 8,
      "NotificationId": 1,
      "NotificationOwnerId": 1001,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Friend Request",
      "NotificationSubTitle": "has send Friend request",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationStatustext": "You have Rejected",
      "notificationResultStatus": "NoStatus"
    },
    {
      "id": 9,
      "NotificationId": 2,
      "NotificationOwnerId": 1002,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Tournament Participation",
      "NotificationSubTitle": "has sent Invitation for Playing Tournament",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationStatustext": "You have Rejected",
      "notificationResultStatus": "NoStatus"
    },
    {
      "id": 10,
      "NotificationId": 3,
      "NotificationOwnerId": 1002,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Private Game Invitation",
      "NotificationSubTitle": "has sent Game invitation",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationResultStatus": "NoStatus",
      "notificationStatustext": "You have Accepted"
    },
    {
      "id": 11,
      "NotificationId": 4,
      "NotificationOwnerId": 1001,
      "NotificationTargetId": 2000,
      "NotificationOwnerPic": "../img/notificationOwnerPic.jpg",
      "NotificationTitle": "Chat Invitation",
      "NotificationSubTitle": "has sent Chat Invitation",
      "DateAndTime": "9/16/2016T10:32:40",
      "isNotificationActive": "true",
      "NotificationStatus": true,
      "notificationResultStatus": "NoStatus",
      "notificationStatustext": "You have Rejected"
    }
];

export default class MainComponent extends React.Component{

	state = {
		data: [],
		dataNotFound:{},
		count:0
	};

	handleAccept=(obj,id)=>{
		var currentData=this.state.data;
		console.log(obj);
		currentData[id].NotificationStatus=obj.NotificationStatus;
		currentData[id].notificationStatustext=obj.notificationStatustext;
		currentData[id].notificationResultStatus=obj.notificationResultStatus;
		this.setState({
			data:currentData 
		});
						
		$.ajax({
			url:"http://localhost:8070/notification/"+id,
			type:"PATCH",
			data:obj,
			success:function (data) {
			}.bind(this),
			error:function(){
				console.log("error in submitting status");
			}.bind(this)
		});
	};

	getNotification=()=>{
		var targetId=2000; 
		// $.ajax({
		// 	url:"http://localhost:8070/notification?NotificationTargetId="+targetId,
		// 	type:"GET",
		// 	success:function (data) {
		// 		this.setState({
		// 			data: data
		// 		});
		// 	}.bind(this),
		// 	error:function(){
		// 		console.log("error in fetching Notifications");
		// 	}.bind(this)
		// });	
		this.setState({
			data:data1
		});
	};

	componentWillMount=()=>{
		this.getNotification();
	};

	handleUnreadNotification=(url)=>{
		var targetId=2000; 
		$.ajax({
			url:url+targetId,
			type:"GET",
			success:function (data) {
				if(data.length==0){
					alert('data not found');
				}else{
					this.setState({
						data: data
					});
				}
			}.bind(this),
			error:function(){
				console.log("error");
			}.bind(this)
		});
	};

	
	handleSearchText=(text)=>{
		alert(text);
	};


	render(){
		return(
			<div>
			<NotificationComponent notificationData={this.state.data}
			handleAcceptStatus={this.handleAccept} 
			fetchSelectedNotification={this.handleUnreadNotification}
			RecentNotification={this.getNotification}
			searchText={this.handleSearchText}
				 // Notifications={this.handleUnreadNotification}
				 />
			 </div>
			 
			 );
		}
	}


// var a =ReactDOM.render(<MainComponent />,document.getElementById('app'));
