// Fro displaying topic details

import React from 'react';

// Material components
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

var ShowTopic = React.createClass({
    changeTopicButtonClicked: function() {
        this.props.change('change', this.props.topic);
    },
    render: function() {
        var rows = [], me=this;
        var topic = this.props.topic;

        return (
            <Paper
                style={{padding: '10px',
                        margin: '0px', 
                        overflow: 'auto', 
                        background: this.props.background,
                    }}
                onTouchTap={this.changeTopicButtonClicked}
            >
                <h4 style={{float: 'left', margin: '10px', paddingLeft: '10px', color: this.props.color}}>{topic}</h4>
                <FlatButton
                    label={this.props.buttonLabel}
                    primary={true}
                    onTouchTap={this.changeTopicButtonClicked}
                    style={{float: 'right'}}
                />
            </Paper>
        );
    }
});

export default ShowTopic;