import SearchComponent from './searchComponent.jsx';
var MovieListComponent= require('./MovieListComponent.jsx'); 

var MainComponent=React.createClass({
  getInitialState:function(){
    return{data:[],filterText:''};
  },
  handleUserInput: function(filterText) {
    $.ajax({
      url: this.props.url+'?s=' + filterText,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data, filterText:filterText});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
    render:function(){
            return(
                  <div>
                  <SearchComponent onUserInput ={this.handleUserInput}/>
                  <MovieListComponent data={this.state.data}/>
                  </div>
              );
          }
});

ReactDOM.render(<MainComponent url="http://www.omdbapi.com" />,document.getElementById("componentBody"));
