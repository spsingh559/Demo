// Component not in use - can be deleted

import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
    divstyle: {marginLeft: '15px',overflow: 'hidden'},
	buttonstyle: {marginLeft: '10px'}
};

const friends = [
    'Shyam',
    'Sukeerthana',
    'Yazhini',
    'Jeevan'
];

var AddPlayer = React.createClass({
    getInitialState: function() {
        return {
            data: ''  
        };
    },
    handleAdd: function(event) {
        var enterName = this.state.data;
        var me = this;
        if (enterName.length > 0)
        {
            enterName = enterName.toLowerCase();
            friends.forEach(function(val) {
                var exName = val.toLowerCase();
                if (exName == enterName)
                {   
                    me.props.add(val); // Calling the parent to add player
                }
            });
            this.setState({
                data: ''
            });           
        }
    },
    handleEnter: function(text) {
        this.setState({
            data: text
        });
        this.handleAdd();
    },
    handleChange: function(text) {
        // Call Backend data for fetching friends list
        this.setState({
            data: text
        });
    },
    render: function() {
        return (
            <div style={{marginLeft: '15px',overflow: 'hidden'}}>
                <div style={{width: '77%', float: 'left'}}>
                	<AutoComplete
                        floatingLabelText="Add Player"
                        filter={AutoComplete.caseInsensitiveFilter}
                        dataSource={friends}
                        onNewRequest={this.handleEnter}
                        onUpdateInput={this.handleChange}
                        searchText={this.state.data}
                        fullWidth={true} 
                    />
                </div>
                <div style={{display: 'inline'}}>                
                    <FlatButton
                        label="Add"
                        primary={true}
                        onTouchTap={this.handleAdd}
                        style={{display: 'inline', marginTop: '30px', minWidth: '50px', marginLeft: '5px'}}
                    />
                </div>
            </div>
        );
    }
});

export default AddPlayer;


// anchorOrigin={{vertical: 'top', horizontal: 'left',}}
// targetOrigin={{vertical: 'bottom', horizontal: 'left',}}