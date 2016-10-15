import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {grey600,grey500, grey100, red900, teal500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import restUrl from '../../restUrl'
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import Cookie from 'react-cookie';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';



  export default class ConfidenceLevel extends React.Component {
    constructor(){
      super();
    };

    componentDidMount(){
      var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: ""
      },     
      axisY :{
        title: "Confidence",
        suffix: ""
      },
      animationEnabled: true,
      axisX :{
        title: "Last 100 Questions",
        suffix: ""
      },
      data: [
      {      
        markerSize: 0, 
        type: "spline",
        showInLegend: true,
        dataPoints: [
  {
    "x": 1,
    "y": 50
  },
  {
    "x": 2,
    "y": 51
  },
  {
    "x": 3,
    "y": 52
  },
  {
    "x": 4,
    "y": 53
  },
  {
    "x": 5,
    "y": 54
  },
  {
    "x": 6,
    "y": 55
  },
  {
    "x": 7,
    "y": 56
  },
  {
    "x": 8,
    "y": 57
  },
  {
    "x": 9,
    "y": 58
  },
  {
    "x": 10,
    "y": 59
  },
          {
    "x": 11,
    "y": 40
  },
  {
    "x": 12,
    "y": 41
  },
  {
    "x": 13,
    "y": 42
  },
  {
    "x": 14,
    "y": 43
  },
  {
    "x": 15,
    "y": 44
  },
  {
    "x": 16,
    "y": 45
  },
  {
    "x": 17,
    "y": 46
  },
  {
    "x": 18,
    "y": 47
  },
  {
    "x": 19,
    "y": 48
  },
  {
    "x": 20,
    "y": 49
  },
          {
    "x": 21,
    "y": 49
  },{
    "x": 22,
    "y": 49
  },{
    "x": 23,
    "y": 45
  },{
    "x": 24,
    "y": 49
  },{
    "x": 25,
    "y": 49
  },
  {
    "x": 26,
    "y": 50
  },
  {
    "x": 27,
    "y": 51
  },
  {
    "x": 28,
    "y": 52
  },
  {
    "x": 29,
    "y": 53
  },
  {
    "x": 30,
    "y": 54
  },
  {
    "x": 31,
    "y": 55
  },
  {
    "x": 32,
    "y": 56
  },
  {
    "x": 33,
    "y": 57
  },
  {
    "x": 34,
    "y": 58
  },
  {
    "x": 35,
    "y": 59
  },
  {
    "x": 36,
    "y": 60
  },
  {
    "x": 37,
    "y": 61
  },
  {
    "x": 38,
    "y": 62
  },
  {
    "x": 39,
    "y": 63
  },
  {
    "x": 40,
    "y": 64
  },
  {
    "x": 41,
    "y": 65
  },
  {
    "x": 42,
    "y": 66
  },
          {
    "x": 43,
    "y": 35
  },
  {
    "x": 44,
    "y": 36
  },
  {
    "x": 45,
    "y": 37
  },
  {
    "x": 46,
    "y": 38
  },
  {
    "x": 47,
    "y": 39
  },
  {
    "x": 48,
    "y": 40
  },
  {
    "x": 49,
    "y": 41
  },
  {
    "x": 50,
    "y": 42
  },
  {
    "x": 51,
    "y": 43
  },
  {
    "x": 52,
    "y": 44
  },
  {
    "x": 53,
    "y": 45
  },
  {
    "x": 54,
    "y": 46
  },
  {
    "x": 55,
    "y": 47
  },
  {
    "x": 56,
    "y": 48
  },
  {
    "x": 57,
    "y": 49
  },
  {
    "x": 58,
    "y": 50
  },
  {
    "x": 59,
    "y": 51
  },
  {
    "x": 60,
    "y": 52
  },
  {
    "x": 61,
    "y": 53
  },
  {
    "x": 62,
    "y": 54
  },
  {
    "x": 63,
    "y": 55
  },
  {
    "x": 64,
    "y": 56
  },
  {
    "x": 65,
    "y": 57
  },
  {
    "x": 66,
    "y": 58
  },
  {
    "x": 67,
    "y": 59
  },
  {
    "x": 68,
    "y": 60
  },
  {
    "x": 69,
    "y": 61
  },
  {
    "x": 70,
    "y": 62
  },
  {
    "x": 71,
    "y": 63
  },
  {
    "x": 72,
    "y": 64
  },
  {
    "x": 73,
    "y": 65
  },
  {
    "x": 74,
    "y": 66
  },
  {
    "x": 75,
    "y": 67
  },
  {
    "x": 76,
    "y": 68
  }
]
      }             
      
      ]
    });

chart.render();
    }

    render(){
      return(
        <Card style={{padding:10,marginTop:20,marginRight:2}} zDepth={3}>

          <CardHeader
            title="Confidence Level Graph"
            subtitle="Showing your level of confidence for this topic"
            avatar="https://cdn1.iconfinder.com/data/icons/business-power-4/48/business_avatar_company_hierarchy_level_position_post-512.png"
          />
          <div id="chartContainer" style={{height: 250, width:'100%'}}/>
        </Card>
      );
    }

  }
