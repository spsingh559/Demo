// Movie List
var MovieList=React.createClass({
   render:function(){
      const style={boxShadow: '10px 30px 10px', borderRadius:'10px',overflow:'hidden'}
    return(
          <ul style={style}>
            
            <li ><img src={this.props.Poster} /></li>
            <li>
            <ul>
            <li>Movie Name:{this.props.Title}</li>
            <li> Year:{this.props.Year}</li>
            <li> ImdbId:{this.props.imdbID}</li>
            <li> Gener:{this.props.Type}</li>
            </ul>
            </li>
          </ul>
      );
  }
});

module.exports=MovieList;
