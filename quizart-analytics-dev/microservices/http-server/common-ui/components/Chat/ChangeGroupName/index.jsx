import React from 'react';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import restUrl from '../../../restUrl';


const style={
   margin: 12,
}

export default class changeName extends React.Component{

  constructor(props){
    super(props);
    this.state=({
      newGroupName :''
    })
  }

  handleChange(e){
    this.setState({
      newGroupName : e.target.value
    })
  }

  changeName(){
    // console.log("Inside chage group name",this.props.GroupData);
    // var url = "http://localhost:8080/groups/"+this.props.GroupData.id;
    var groupData = {
            groupname : this.state.newGroupName ,
            groupid : this.props.GroupData.topicid,
          };
    $.ajax({
      url: restUrl + '/api/v1/leavegroup/changename',
      dataType: 'json',
      type: 'PUT',
      data : JSON.stringify(groupData),
      success : function(data){
        // console.log("====Inside Change Group",data);``
        // this.setState({GroupData: this.state.GroupData.concat(data.groupdata)});
      }.bind(this),
    });
    this.props.close(this.state.newGroupName);
  }

  render(){
    return(
      <div>
        <div className="row">
        <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
          <h5>Change Group Name </h5>
          <TextField
          hintText="New Group Name"
          floatingLabelText="Change Group Name"
          onChange={this.handleChange.bind(this)}
          />
          <RaisedButton label="Change" primary={true} style={style} onTouchTap={this.changeName.bind(this)}/>
          <RaisedButton label="Cancel" primary={true} style={style} onTouchTap={this.props.close.bind(this,"close")}/>
          </div>
        </div>
      </div>
    )
  }
}
