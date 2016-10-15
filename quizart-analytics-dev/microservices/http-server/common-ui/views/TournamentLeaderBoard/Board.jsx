import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {PropTypes} from 'react';

import restUrl from '../../restUrl';

const style = {
  marginLeft:0,
  marginTop:20,
  marginBottom:20,
  marginRight:0,
};

const tour_header={
  margin:20,
  textAlign:'center',
  paddingTop:20,
}

export default class Board extends React.Component {
  constructor(props){
    super(props);
    console.log('Inside LeaderBoard constructor: '+this.props.params.id);
    this.state = {
      rows:[]
    };
  }

  handleProfile(userId){
    this.context.router.push(
      '/profilePage/'+userId
    );
  }

  static get contextTypes(){
    return {
      router: PropTypes.object.isRequired
    }
  }

  componentDidMount() {
    var request = $.ajax({
      url: restUrl + '/api/v1/tournaments/'+this.props.params.id,
      type: 'GET',
    });
    request.done(function(data) {
      console.log(JSON.stringify(data));
      var levels = data.levels;
      var currentLevel = -1;
      for(var i=0;i<levels.length;i++) {
        if(levels[i].active=='yes') {
          currentLevel = i;
          break;
        }
      }
      if(currentLevel==-1) {
        currentLevel = levels.length;
      }
      this.setState({rows:data.levels[currentLevel-1].leaderboard});
    }.bind(this));
    request.fail(function() {
      console.error('LeaderBoard error');
    }.bind(this));
  }

  render(){
    console.log("state data: "+JSON.stringify(this.state.rows));
    const style = {margin: 5, marginLeft: 0, marginRight: 0, left: 0};
    var row = [];
    for (var i = 0; i < this.state.rows.length; i++) {
      row.push(
        <TableRow>
          <TableRowColumn>{i+1}</TableRowColumn>
          <TableRowColumn>
            <ListItem
              disabled={true}
              leftAvatar={
                <Avatar
                  src="https://s31.postimg.org/qgg34o597/nature.jpg"
                  size={30}
                  style={style}
                />
              }
            >
            <div onClick={this.handleProfile.bind(this, this.state.rows[i].userId)}>{this.state.rows[i].userId}</div>
            </ListItem>

          </TableRowColumn>
          <TableRowColumn>{this.state.rows[i].score}</TableRowColumn>
        </TableRow>
      );
    }
    return (
      <div>
        <Paper style={style} zDepth={2} >
          <Card>
            <h1 style={tour_header}>Tournament LeaderBoard</h1>
            <Card>
              <CardText>
                <Table
                  selectable={false}
                  multiSelectable={false}
                >
                  <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                  >
                    <TableRow>
                      <TableHeaderColumn>Rank</TableHeaderColumn>
                      <TableHeaderColumn>Player</TableHeaderColumn>
                      <TableHeaderColumn>Score</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={false}
                  >
                    {row}
                  </TableBody>
                </Table>
              </CardText>
            </Card>
          </Card>
        </Paper>
      </div>
    );
  }
}
