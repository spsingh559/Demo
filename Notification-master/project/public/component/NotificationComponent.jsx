// import React from 'react';

import React from 'react';
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import EachNotificationComponent from './EachNotificationComponent.jsx';

export default class NotificationComponent extends React.Component {

  
    render() {
    console.log("snack bar");
    console.log("Notification data");
    console.log(this.props.notificationData.length);
   var count=0;
   for(var i=0;i<this.props.notificationData.length;i++){
    if(this.props.notificationData[i].NotificationStatus=="true"){
      count++;
    }
   }

    console.log("notification is" +count);
var data=this.props.notificationData.map(function(data){
  return(
    <div key={data.id}>
    <EachNotificationComponent 
    count={count}
    NotificationOwnerId={data.NotificationOwnerId}
    NotificationOwnerPic={data.NotificationOwnerPic}
    NotificationTitle={data.NotificationTitle}
    NotificationSubTitle={data.NotificationSubTitle}
    DateAndTime={data.DateAndTime}
    Event={data.Event}
    isNotificationActive={data.isNotificationActive}
    NotificationStatus={data.NotificationStatus}
     />
    </div>
    );

}.bind(this));

    return (
      <div>
         <List>
          <Subheader inset={true}>Notification </Subheader>
            {data} 
        </List>
          
        {/*<Snackbar
          open={this.state.open}
          message=" 2 Requests Recieved"
           action={this.}
            onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
        />*/}
     
      </div>
    );
  }
}