// Text-box for typing and button to send message

// Material Components
import TextField from 'material-ui/TextField';
import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';

var ChatFooterComponent=React.createClass(
{
	getInitialState:function()
	{
		return ({
			message: '',
			name: 'this user',
			status: true
		});
	},
	messageHandle:function(e)
	{
		if( e.target.value.length > 0 )
		{
			this.setState({
				message: e.target.value,
				status: false
			});
		}
		else
		{
			this.setState({
				message: e.target.value,
				status: true
			});
		}

	},
	send:function()
	{
		if( this.state.message.length > 0 )
		{
			this.props.handleSend(this.state.name, this.state.message);
			//this.props.chatSocket.emit('message send', {name: this.state.name, message: this.state.message});
			this.setState({
				message:'',
				status: true
			});
		}
	},
	keyPressed: function(data) {
		if(data.which == 13)
		{
			this.send();
		}
	},
	render:function()
	{		
	   	return(
				<div style={{paddingLeft: '6px'}}>
					<TextField style={{width: '83%', float: 'left'}} hintText="Type a Message"
						    value={this.state.message}
						    onChange={this.messageHandle}
						    onKeyDown={this.keyPressed}/>
					<IconButton iconStyle={{color:'rgb(0, 188, 212)'}} onTouchTap={this.send} disabled={this.state.status} >
						<ContentSend />
					</IconButton>
				</div>
			);
	}
	
});
export default ChatFooterComponent;