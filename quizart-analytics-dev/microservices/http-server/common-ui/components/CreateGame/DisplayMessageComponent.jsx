// Container to show chat messages series
// Height Difference is set to maintain window height

var ReactDom = require('react-dom');
import React from 'react';

// Custom components
import MessageComponent from './MessageComponent.jsx';

var DisplayMessageComponent=React.createClass({
	gotoLast: function() 
	{
		var node = ReactDom.findDOMNode(this);
  		node.scrollTop = node.scrollHeight;
	},
	componentDidMount: function()
	{
		this.gotoLast();
	},
	componentWillUpdate: function()
	{
		var node = ReactDom.findDOMNode(this);
		//this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
	},
	componentDidUpdate: function()
	{
		//if (this.shouldScrollBottom)
		this.gotoLast();
	},

	render:function()
	{
		var messages=[];
		var data=this.props.data;
		var hf = 329 + this.props.heightDiff + 'px';
		
		if(data)
		{
			data.map(function(object, i){ 
				messages.push(<MessageComponent data={object} key={i} />);
			});
		}   
		return(
			<div style={{color:"black",
						width:"100%",
						height: hf, 
						overflow: 'auto', 
						padding: '0px 10px 0px 0px'}}>
				{messages}
			</div>
		); 
	}

});
export default DisplayMessageComponent;

// this.height = window.innerHeight - 255;