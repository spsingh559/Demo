import React from 'react';

const styles={
  width:'100%'
}
export default class Leaderboard extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    //console.log('Quiz props: ' + JSON.stringify(this.props));
  }

  render(){
    return(
      <div>
      <h1> </h1>
        <img src="https://i.ytimg.com/vi/X-1GiTtqQT8/maxresdefault.jpg" style={styles}/>
      </div>
    );
  }
};
