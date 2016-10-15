// Friends list item - component to display a friend detail at a time

import React from 'react';

// Material Components
import Done from 'material-ui/svg-icons/action/done';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ListItem from 'material-ui/List/ListItem';


var AddPlayerList = React.createClass({
    selectPlayer: function() {
        this.props.select(this.props.friendDetails.key)
    },
    render: function() {
        var me=this;
        if (this.props.friendDetails.status === 'not selected')
        {
            return (
                <ListItem
                    primaryText={this.props.friendDetails.name}
                    secondaryText="online"                        
                    innerDivStyle={{margin: '2px 0px',padding: '8px 14px',background: 'white'}}
                    key={this.props.friendDetails.key}
                    onTouchTap={this.selectPlayer}
                />
            );
        }
        else if (this.props.friendDetails.status === 'added')
        {
            return (
                <ListItem
                    disabled={true}
                    primaryText={this.props.friendDetails.name}
                    secondaryText="online - Player already added"                        
                    innerDivStyle={{margin: '2px 0px',padding: '8px 14px',background: 'lightgrey'}}
                    key={this.props.friendDetails.key}
                />
            );
        }
        else
        {
            return (
                <ListItem
                    primaryText={this.props.friendDetails.name}
                    secondaryText="online"                        
                    innerDivStyle={{margin: '2px 0px',padding: '8px 14px', background: '#ebebfa'}}
                    rightIcon={<Done style={{margin: '0px', marginRight: '5px'}} />}
                    key={this.props.friendDetails.key}
                    onTouchTap={this.selectPlayer}
                />
            );
        }
    }
});

export default AddPlayerList;