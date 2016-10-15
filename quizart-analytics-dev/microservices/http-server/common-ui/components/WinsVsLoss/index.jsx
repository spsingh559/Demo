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
import LinearProgress from 'material-ui/LinearProgress';
import {red500,blue50,cyan900,teal200} from 'material-ui/styles/colors';

const tdstyle={
padding:"10px"
};
var baseurl='/';

export default class WinsVsLoss extends React.Component {

  
  // constructor(props)
  // {
  //   super(props);
  //   this.state={data: []};
  // };

  // componentDidMount() 
  // {
  //   this.loadDataFromServer();
  //   //setInterval(this.loadDataFromServer, 10000);
       
  // };

// loadDataFromServer()
// {
//    $.ajax(
//       {
//       url: restUrl + '/api/v1/analytics/user/ericksonbooth@recritube.com/winloss',
//       type: 'GET',
//       dataType:'JSON',
//       success:function(dataArr)
//       {
//         console.log(dataArr);
//         this.setState({data: dataArr});
//         console.log(this.state.data[0].count);
//         console.log(this.state.data[1].count);
//       }.bind(this),
//       error:function(err)
//       {
//         console.error('err');
//       }.bind(this)
//       });

// }



add(x,y){
  x=((x/(x+y))*100);
  return x;

};

  render() {
    //console.log("data coming as", this.state.data[0].count);
  return (
               <Card zDepth={3}>
                    <CardTitle title="WinsVsLoss" titleColor={cyan900} style={{textAlign:"center"}}/>
                   <CardText>
                   <center>
                    <div style={{marginBottom:'30px',padding:"0px"}}>            
                    <LinearProgress mode="determinate" value={this.add(1,2)} style={{margin:"10px",height:'30px',textAlign:'right'}}/>  
                    </div>
                    </center>
                    </CardText>
                </Card>
            );
  }
};