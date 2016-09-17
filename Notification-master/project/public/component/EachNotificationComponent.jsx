import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from 'material-ui/Snackbar';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import {fullWhite} from 'material-ui/styles/colors';

import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';


export default class EachNotificationComponent extends React.Component{

  constructor(props) {
    super(props);

    }
  

  render(){
console.log("eachnotification"+this.props.count);   

    return(
      <div>
        <Divider inset={true} />
        <ListItem 
          leftAvatar={<Avatar src={this.props.NotificationOwnerPic} />}
          primaryText={this.props.NotificationOwnerId
                      +this.props.NotificationSubTitle}
          secondaryText={this.props.DateAndTime}
        />
      </div>
          );
        }
      }
