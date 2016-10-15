// Add player floating button with it's dialog
// Friends list is fetched here

import React from 'react';

// Material Components
import FlatButton from 'material-ui/FlatButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

// Custom Components
import AddPlayerList from './PlayerList-AddPlayerList.jsx';

const friends = [
    'Shyam','Sukeerthana','Yazhini','Jeevan','Rohan','Souparnika','Sachin','John','Jacob', 'Vishal', 'Albert', 'Vivek', 'Keerthana', 'Jack',
    'Tom', 'Ullas', 'Bhavana', 'Kavya', 'Anish', 'Vaishak', 'Jackson', 'Spoorthy', 'Sasi', 'Subin', 'Soman'];

var AddPlayer = React.createClass({
    getInitialState: function() {
        this.generateFriends();
        this.searchFriends = this.searchFriendsFullList;
        return {
            data: '',
            open: false
        };
    },
    handleOpen: function() {
        this.playerCount = 0;
        this.searchFriendsFullList.map(function(friend, i) {
            if (friend.status === 'selected')
            {
                friend.status = 'not selected';
            }
        });
        this.setState({open: true});
    },
    handleClose: function() {
        this.searchFriends = this.searchFriendsFullList;
        this.setState({data: '', open: false});
    },
    handleAdd: function() {
        var me = this;
        this.searchFriendsFullList.map(function(friend, i) {
            if (friend.status === 'selected')
            {
                me.props.add(friend.name);
                friend.status = 'added';
            }
        });
        this.searchFriends = this.searchFriendsFullList;
        this.setState({data: '', open: false});
    },
    generateFriends: function() {
        this.playerCount = 0;
        this.searchFriendsFullList = [];
        var me = this;

        friends.forEach(function(f, i) {
            me.searchFriendsFullList.push({
                key: i,
                name: f,
                status: 'not selected'
            });
        });
    },
    handleChange: function(event) {
        // Call Backend data for fetching friends list
        this.searchFriends = [];
        var me=this;
        var textBoxVal = event.target.value.toLowerCase();
        this.searchFriendsFullList.map(function(friend, i) {
            var friendFromArray = friend.name.toLowerCase();
            if (friendFromArray.indexOf(textBoxVal) >= 0)
            {
                me.searchFriends.push(friend);
            }        
        });
        this.setState({
            data: event.target.value
        });
    },
    selectPlayer: function(index) {
        if(this.searchFriendsFullList[index].status === 'selected')
        {
            this.searchFriendsFullList[index].status = 'not selected';
            this.playerCount--;
        }        
        else
        {
            this.searchFriendsFullList[index].status = 'selected';
            this.playerCount++;
        }

        this.setState({
            open: true
        });
    },
    componentDidUpdate: function() {
        var delName = this.props.del;
        if (delName.length > 0)
        {
            this.searchFriendsFullList.map(function(friend, i) {
                if (friend.name === delName && friend.status === 'added')
                {
                    friend.status = 'not selected';
                }        
            });
        }
    },
    render: function() {
        var me=this;
        var inHeight = window.innerHeight/2 + 'px';
        
        const actions = [
            <Divider />,
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                style={{margin: '5px'}}
            />,
            <FlatButton
                label="Add"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleAdd}
                style={{margin: '10px 5px'}}
            />,
        ];

        const friendsCheckBoxes = [];

        if (this.searchFriends.length > 0)
        {
            this.searchFriends.forEach(function(friend, i) {
                // if(friend.status !== 'added')
                {
                    friendsCheckBoxes.push(
                        <AddPlayerList
                            friendDetails={friend}
                            key={i}
                            select={me.selectPlayer}/> );
                }
            });
        }
        else
        {
            friendsCheckBoxes.push(
                <ListItem
                    primaryText="No Friends Found !"
                    innerDivStyle={{textAlign: 'center', background: '#ebebfa'}}
                    disabled={true}
                    key={0}
                    
                />
            );
        }

        var noOfPlayers = '';
        if(this.playerCount === 0)
            noOfPlayers = '';
        else
            noOfPlayers = this.playerCount + " Player(s) Selected";
        
        if(this.props.device == 'mobile')
        {    
            return (   
                <div>
                    <FloatingActionButton 
                        onTouchTap={this.handleOpen}
                        style={{zIndex: 100,position: 'absolute', bottom: '115px', right: '20px'}}
                    >
                        <PersonAdd />
                    </FloatingActionButton>
                    <Dialog
                        title={
                            <h3>Add Players <small style={{float: 'right', marginTop: '9px'}}>{noOfPlayers}</small></h3>
                        }
                        titleStyle={{padding: '10px', paddingLeft: '24px'}}
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        autoDetectWindowHeight={true}
                        contentStyle={{width: '100%'}}
                        bodyStyle={{padding: '0px', overflow: 'hidden'}}
                        actionsContainerStyle={{padding: '3px 0px'}}
                    >
                        <div style={{width: '100%',padding: '0px',paddingLeft: '24px',paddingRight: '10px'}}>
                            <TextField
                                hintText="Search Friends"
                                value={this.state.data}
                                fullWidth={true}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div style={{textAlign: 'right', marginRight: '10px'}}>
                            <span style={{fontSize: '12px'}}>
                                Showing {this.searchFriends.length} of
                                &nbsp;{this.searchFriendsFullList.length} Friends
                            </span>
                        </div>
                        <div style={{overflow: 'scroll', height: inHeight, padding: '10px'}}>
                            <List>
                                {friendsCheckBoxes}
                            </List>
                        </div>
                    </Dialog>
                </div>
            );
        }
        else
        {
            return (
                <div style={{width: '100%', overflow: 'auto', textAlign: 'right', margin: '10px 0px', marginLeft: '-15px'}}>
                    <FlatButton
                        label="Add new player"
                        primary={true}
                        icon={<PersonAdd />}
                        onTouchTap={this.handleOpen}
                    />
                    <Dialog
                        title={
                            <h3>Add Players <small style={{float: 'right', marginTop: '9px'}}>{noOfPlayers}</small></h3>
                        }
                        titleStyle={{padding: '10px', paddingLeft: '24px'}}
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        autoDetectWindowHeight={true}
                        contentStyle={{width: '45%'}}
                        bodyStyle={{padding: '0px'}}
                        actionsContainerStyle={{padding: '3px 0px'}}
                    >
                        <div style={{width: '100%',padding: '0px',paddingLeft: '24px',paddingRight: '10px'}}>
                            <TextField
                                hintText="Search Friends"
                                value={this.state.data}
                                fullWidth={true}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div style={{textAlign: 'right', marginRight: '10px'}}>
                            <span style={{fontSize: '12px'}}>
                                Showing {this.searchFriends.length} of
                                &nbsp;{this.searchFriendsFullList.length} Friends
                            </span>
                        </div>
                        <div style={{overflow: 'scroll', height: inHeight, padding: '10px'}}>
                            <List>
                                {friendsCheckBoxes}
                            </List>
                        </div>
                    </Dialog>
                </div>
            );
        }
    }
});

export default AddPlayer;