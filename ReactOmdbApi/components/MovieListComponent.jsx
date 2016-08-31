var MovieList= require('./MovieList.jsx'); 
var MovieListComponent=React.createClass({
  render:function(){
   var  data=this.props.data;
    var datas=data.Search;
    var rows=[];
     console.log(datas);
     if(datas != undefined)
      {
  datas.forEach(function(listdata){
      rows.push(
        <MovieList Title={listdata.Title} 
                  Year={listdata.Year}
                  imdbID={listdata.imdbID}
                  Type={listdata.Type}
                  Poster={listdata.Poster}
                  />
        );
    });
    }
    return(
          <div>
           {rows}
          </div>
          
      );
  }
});
module.exports= MovieListComponent;