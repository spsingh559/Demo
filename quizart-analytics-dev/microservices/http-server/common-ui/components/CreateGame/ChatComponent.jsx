// Chat Main Component
// Messages are fetched from this component
// Set-Interval from checking backend
// Passing Height Difference to set window height

// Material Components
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import React from 'react';

// Custom Components
import DisplayMessageComponent from './DisplayMessageComponent.jsx';
import ChatFooterComponent from './ChatFooterComponent.jsx';

 var  chat;
// Message Array - Need to fetch from Backend
var message=[
	 {
	 	name:"person1",
	 	msg:"Hi...",
	  },
	 {
	 	name:"this user",
	 	msg:"Hello..",
	  },
	 {
	 	name:"person person 3",
	 	msg:"Hiiii",
	  },
	 {
	 	name:"person abc 4",
	 	msg:"Hellooo",
	 }
];

// Chat Component
var ChatComponent = React.createClass({
	getInitialState:function()
	{
		chat = this;
	    return ({
	    	data: [],
	    	 });

	},
	getMessages: function ()
	{
		var arrayEq = true;
		// AJAX Get Operation
		// Inside success

		if (message.length !== this.state.data.length)
		{	arrayEq = false;}
		else
		{
			for(var i = 0; i < this.state.data.length; i++)
			{
				if(message[i].msg != this.state.data[i].msg)
					arrayEq = false;
			}
		}
		
		if (arrayEq == false)
		{
			console.log("not Equal");
			this.setState({
				data: message
			});
		}
	},
	handleSend:function(name,msg)
	{
		var newMsg={
			name:name,
			msg:msg
		}

		// AJAX Post operation Here
		
		message.push(newMsg);
		this.setState({
			data:message
		});		
	},
	componentWillMount: function()
	{
		this.getMessages();
	},
	render:function()
	{
		return(
			<div style={{width:"100%", marginTop: '10px'}}>				
				<Paper style={{padding:"5px 0px", paddingTop: '0px'}}>
					<DisplayMessageComponent
						data={this.state.data}
						heightDiff={this.props.heightDiff}
					/>
					<Divider /><br />
					<ChatFooterComponent handleSend={this.handleSend} />
				</Paper>
			</div>
		);
	}
});

//chatSocket={chatSocket}

// chatSocket.on('update message', function(data) {
// 	console.log("Sending Message");
// 	chat.handleSend(data.name, data.message);



// });

export default ChatComponent;