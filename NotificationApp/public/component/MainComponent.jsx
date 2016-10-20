import React from 'react';
import ReactDOM from 'react-dom';
import NotificationComponent from './NotificationComponent.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
var socket = io();
injectTapEventPlugin();
class MainComponent extends React.Component{

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
		$.ajax({
			url:"http://localhost:8070/notification?NotificationTargetId="+targetId,
			type:"GET",
			success:function (data) {
				this.setState({
					data: data
				});
			}.bind(this),
			error:function(){
				console.log("error in fetching Notifications");
			}.bind(this)
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

	creatNoti=()=>{
	// alert('notification sent now');
	socket.emit('message',{msg:'notification is created'});
	};
	handleSearchText=(text)=>{
		alert(text);
	};


	render(){
		return(
			<MuiThemeProvider>
			<div>
			<div>
			<NotificationComponent notificationData={this.state.data}
			handleAcceptStatus={this.handleAccept} 
			socket={socket}
			fetchSelectedNotification={this.handleUnreadNotification}
			RecentNotification={this.getNotification}
			searchText={this.handleSearchText}
				 // Notifications={this.handleUnreadNotification}
				 />
			 </div>

			 {/*<RaisedButton 
			 			 label="Send Notification"
			 			 primary={true}
			 			 style={{marginLeft:'20px'}}
			 			 onTouchTap={this.creatNoti}
			 			 />*/}
			 </div>
			 </MuiThemeProvider>
			 );
		}
	}
// MainComponent.childContextTypes={
// 	socket:React.PropTypes.object
// };

var a =ReactDOM.render(<MainComponent />,document.getElementById('app'));
