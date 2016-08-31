var SearchComponent =React.createClass({
  getInitialState:function(){
  return {filterText:""};
  },
  handleChange:function(e){    
    this.setState({filterText:e.target.value});
    console.log("Text chnage" +this.state.filterText); 
  },
  handleSubmit:function(){
    this.props.onUserInput(this.state.filterText);     
  },
  render:function(){
    return(
        <div>        
        <input type="text"
         placeholder="Search your Movie here"
        value={this.state.filterText} 
         onChange={this.handleChange}
        />
         <input type="submit" value="Search" className="btn btn-primary" onClick={this.handleSubmit}/> 
        </div>
      );
  }
});

module.exports= SearchComponent;
