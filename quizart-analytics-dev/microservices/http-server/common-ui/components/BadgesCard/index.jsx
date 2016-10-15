import React from 'react';
import MainAppBar from '../../components/MainAppBar';
import Dashboard from '../../components/dashboard';
import NavBar from '../../components/NavBar';
// import TabsMobile from '../../components/Tabs';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import MediaQuery from 'react-responsive';
import ChatDrawer from '../../components/Chat/ChatDrawer';
import SubTopicContainer from '../../components/SubTopics/SubTopicContainer';
import restUrl from '../../restUrl';
import TabsMobile from '../../components/Tabs';
import {red500,blue50,cyan900} from 'material-ui/styles/colors';

var baseurl='/';

export default class Badges extends React.Component {

  constructor(props){
    super(props);
    this.state={
      details: [{"img":"https://cohortarrivals.com/assets/feature-icons/thumbs-up-aea4eb708ceddc3473a167418e2c6194.png"}
               
                ]
    }
  };

render() {
  var badges = this.state.details.map(function (d) {
            return (
                <div className="col-lg-2 col-md-4 col-sm-4 col-xs-6">
                <Avatar src={d.img} size={50}/>
                <label>Thumbs-Up</label>
                </div>
            );
        });
  return (
               <Card zDepth={3}>
                    <CardTitle title="Badges" titleColor={cyan900}/>
                   <div className="row" style={{margin:"10px",padding:"10px",height:388}}>{badges}</div>
                   </Card>
            );
  }
};