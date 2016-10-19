import React from 'react';
import ReactDOM from 'react-dom';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NotificationComponent from './NotificationComponent.jsx';
// var socket = io();
// injectTapEventPlugin();

import restUrl from '../../restUrl';

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
						
		// $.ajax({
		// 	url:"http://localhost:8070/notification/"+id,
		// 	type:"PATCH",
		// 	data:obj,
		// 	success:function (data) {
		// 	}.bind(this),
		// 	error:function(){
		// 		console.log("error in submitting status");
		// 	}.bind(this)
		// });
	};

	getNotification=()=>{
		var targetId=2000; 
		console.log("executed");
    $.ajax({
      url:restUrl+'/notifications',
      type:'GET',
      success: function(data){
         console.log('notifications success');
        // console.log(data.msg);
        this.setState({
      data:data.msg
    });
      }.bind(this),
      error:function(err){
        console.log('notifications error');
      }.bind(this)
    });
		
	};

	componentWillMount=()=>{
		this.getNotification();

	};

	handleUnreadNotification=(url)=>{
		var targetId=2000; 
		// $.ajax({
		// 	url:url+targetId,
		// 	type:"GET",
		// 	success:function (data) {
		// 		if(data.length==0){
		// 			alert('data not found');
		// 		}else{
		// 			this.setState({
		// 				data: data
		// 			});
		// 		}
		// 	}.bind(this),
		// 	error:function(){
		// 		console.log("error");
		// 	}.bind(this)
		// });
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
