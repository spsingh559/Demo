import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';
import NotificationComponent from './NotificationComponent.jsx';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class MainComponent extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
};
getNotification=()=>{
	var targetId=2000; //coming from session
$.ajax({
			url:"http://localhost:8070/notification?NotificationTargetId="+targetId,
			type:"GET",
			success:function (data) {
				this.setState({
					data: data
				});
			}.bind(this),
			error:function(){
				console.log("error");
			}.bind(this)
		});
		
};
	componentWillMount=()=>{
		console.log("componentWillMount");
		this.getNotification();
		 // setInterval(this.getNotification, 2000);
	};

	render(){
		console.log(this.state.data);
		return(
			<MuiThemeProvider>
			<div>
			 <AppBar title="Notifications detail" 
			 iconClassNameRight="muidocs-icon-navigation-expand-more"/>
			 <NotificationComponent notificationData={this.state.data} />
			</div>
			</MuiThemeProvider>
			);
	}
}



ReactDOM.render(<MainComponent />,document.getElementById('app'));