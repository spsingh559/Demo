import React from 'react';

export default class Leaderboard extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    //console.log('Quiz props: ' + JSON.stringify(this.props));
  }

  render(){
    console.log(this.props.leaderboard);
    var obj=this.props.leaderboard;
    if(obj==undefined)
    {
      return (
          <h1>N</h1>
        );
    }
    var str="";
    for (var prop in obj)
    {
        str=str+prop+" : "+obj[prop]+"  ";
    }

    return(
      <div>
        {str}
      </div>
    );
  }
};
