// Component to handle viewing and adding Topic for Quiz
// Once topic is added, it should update the backend

import React from 'react';

// Custom Components
import AddTopic from './Topic-AddTopic.jsx';
import ShowTopic from './Topic-ShowTopic.jsx';

 var  topic;

var Topic = React.createClass({
	getInitialState: function()
    {
        console.log("Initializing Topic");
        this.butLab = ' ';
        topic = this;
        return {
            topic: true,
            topicName: 'Add a Topic',
            color: 'lightgrey'
        };
    },
    handleChange: function(operation, val) {
    	if(operation == 'change')
    	{
            if(val == 'Add a Topic')
            {
                val = '';
            }
	    	this.setState({
	    		topic: false,
	    		topicName: val
	    	});
	    }
	    else if(operation == 'add')
	    {
            this.butLab = 'change';

            // AJAX POST Operation here
	    	
            this.setState({
	    		topic: true,
	    		topicName: val,
                color: 'black'
	    	});
	    }
    },
    render: function() {
        var backColor;
        if(this.props.device === 'mobile')
        {
            backColor = '#e6fcff';
        }
        else
        {
            backColor = 'white';
        } 
    	if(this.state.topic)
    	{
        	return (
	        	<div style={{padding: '0px',width: '100%'}}>
	            	<ShowTopic
                        change={this.handleChange}
                        topic={this.state.topicName}
                        color={this.state.color}
                        buttonLabel={this.butLab}
                        background={backColor}
                    />
	            </div>
        	);
        }
        else
        {
        	return (
	        	<div style={{padding: '0px',width: '100%'}}>
	            	<AddTopic
                        change={this.handleChange}
                        defaultVal={this.state.topicName}
                        // topicSocket={topicSocket}
                        background={backColor}
                    />
	            </div>
        	);
        }
    }
});

// topicSocket.on('update topic', function(val) {
//     topic.handleChange('add', val);
// });

export default Topic;