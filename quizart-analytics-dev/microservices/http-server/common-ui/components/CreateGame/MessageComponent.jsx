// Each chat component - smallest container in chat lifeline

// Material Components
import React from 'react';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import {green100, blue100, indigo900} from 'material-ui/styles/colors';

// Setting the current user name - later should fetch from Session
const user = 'this user';

var MessageComponent=React.createClass({

	render:function()
	{
		var data=this.props.data, myColor;

		if(data.name == user)
		{
			return(
				<div style={{padding:"5px", width: '100%', float: 'right'}}>
					<Chip backgroundColor={green100}
						style={{ margin: "0px",maxWidth:"90%", overflow: 'auto', minWidth: '80px', float: 'right'}}>
						<p style={{margin:"0px"}}>
							<span style={{color:"#00008B"}}>Me</span>&nbsp;&nbsp;&nbsp;{data.msg}
						</p>
					</Chip>
				</div>
			);
		}
		else
		{
			return(
				<div style={{padding:"5px", width: '100%'}}>
					<Chip backgroundColor={blue100}
						style={{ margin: "0px",maxWidth:"90%",  overflow: 'auto',minWidth: '80px', minWidth: '50px'}}>
						<p style={{margin:"0px"}}>
							<span style={{color:"#00008B"}}>{data.name}</span>&nbsp;&nbsp;&nbsp;{data.msg}
						</p>
					</Chip>
				</div>
			);
		}
	}
});

export default MessageComponent;