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
import Chip from 'material-ui/Chip';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {teal900,blue200,brown800,grey800,grey50,blue100} from 'material-ui/styles/colors';


const chip = {
    width:500
  };

  const marg={
      margin: 20
  };

  export default class LeaderBoardRecord extends React.Component 
    
  {
    constructor()
    {
      super();
      this.state = {
            arr:[],showCheckboxes: false
      }
    };
    componentDidMount() {
        $.ajax(
      {
      url: restUrl + '/api/v1/analytics/user/'+this.props.topicid+'/leaderboard',
      type: 'GET',
      dataType:'JSON',
      success:function(dataArr)
      {
        console.log(dataArr);
        this.setState({arr: dataArr});
        
      }.bind(this),
      error:function(err)
      {
        console.error('err');
      }.bind(this)
      });
    };

    render()
    {
        var chips=this.state.arr.map(function(d,index){
            return(
                <TableRow displayRowCheckbox={false}>
                    <TableRowColumn style={{textAlign:'center'}}><Avatar>{d["favTopics"][0]["userId"].toString().charAt(0)}</Avatar></TableRowColumn>
                    <TableRowColumn style={{textAlign:'center'}}><lead style={{fontSize:16}}>{index+1}</lead></TableRowColumn>
                    <TableRowColumn style={{textAlign:'center'}}><lead style={{fontSize:16}}>{d["favTopics"][0]["userId"]}</lead></TableRowColumn>
                    <TableRowColumn style={{textAlign:'center'}}><lead style={{fontSize:16}}>{d["favTopics"][0]["experience"]}xp</lead></TableRowColumn>
                    <TableRowColumn style={{textAlign:'center'}}><Avatar src="http://www.thebadgecentre.co.uk/images/detailed/0/india-round-flag.png" /></TableRowColumn>
                </TableRow>
                );
        });
        

      return(
       
        
           <Card style={{paddingTop:10,paddingBottom:10,marginTop:20}} zDepth={3}>

            <CardHeader
                title="Leader Board"
                subtitle="Users leading this topic"
                avatar="http://a1239.phobos.apple.com/us/r30/Purple5/v4/e9/bc/e1/e9bce142-588b-825c-350f-480ff6e23666/pr_source.png?downloadKey=1419010248_01f03fa3976e8693ce58d8dca7c4e3ce"
            />
            
            <Table style={{}} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{background:blue100}}>
                    <TableRow style={{textAlign:'center'}}>
                        <TableHeaderColumn style={{textAlign:'center',color:brown800,fontSize:20}}>Player</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:'center',color:brown800,fontSize:20}}>Ranking</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:'center',color:brown800,fontSize:20}}>Name</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:'center',color:brown800,fontSize:20}}>Experience</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:'center',color:brown800,fontSize:20}}>Country</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true}>
                    {chips}
                </TableBody>
            </Table>
            </Card>
        
      );
    }
  }