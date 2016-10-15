// Adding a new topic (autofill and button)
// Topic list are set here

import React from 'react';

// Material components
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

// Topic list - need to fetch from backend
const topics = [
    'Sports',
    'Science',
    'Nature',
    'Technology',
];

var AddTopic = React.createClass({
    getInitialState: function() {
        return {
            data: this.props.defaultVal  
        };
    },
    addTopicButtonClicked: function() {
        var topicName = this.state.data;
        var me = this;
        if (topicName.length > 0)
        {
            topicName = topicName.toLowerCase();
            topics.forEach(function(val) {
                var exName = val.toLowerCase();
                if (exName == topicName)
                {
                    me.props.change('add', val);
                    // me.props.topicSocket.emit('topic changed', val);
                }
            });
        }
    },
    handleEnter: function(text) {
        this.state.data = text;
        this.addTopicButtonClicked();
    },
    handleChange: function(text) {
        // Call Backend data for fetching friends list
        this.setState({
            data: text
        });
    },
    render: function() {
        var me=this;
        return (
            <Paper
                style={{padding: '10px',
                        paddingBottom: '0px',
                        margin: '0px', 
                        overflow: 'hidden', 
                        background: this.props.background,
                        height: '62px'
                    }}
            >
                <div style={{width: '70%', float: 'left'}}>
                    <AutoComplete
                            floatingLabelText="Add Quiz Topic"
                            filter={AutoComplete.caseInsensitiveFilter}
                            dataSource={topics}
                            onNewRequest={this.handleEnter}
                            onUpdateInput={this.handleChange}
                            searchText={this.state.data}
                            style={{marginTop: '-23px'}}
                            fullWidth={true} 
                        />
                        </div>
                    <div style={{display: 'inline'}}>                
                    <FlatButton
                        label="Add"
                        primary={true}
                        onTouchTap={me.addTopicButtonClicked}
                        style={{float: 'right'}}
                    />
                </div>
            </Paper>
        );
    }
});

export default AddTopic;