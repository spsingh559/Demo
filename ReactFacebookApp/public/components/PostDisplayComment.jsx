// import EachPostComponent from './EachPostComponent.jsx';
var EachPostComponent= require('./EachPostComponent.jsx'); 
var PostDisplayComment=React.createClass({
	getInitialState:function(){
		console.log("5")
		return{ likeData:[]}
	},
	oneDltCmp:function(values){
 		this.props.onDlt(values);
	},
	editSave:function(saveData,id){
		this.props.onSave(saveData,id);
	},
	componentWillMount:function(){
		$.ajax({
			url:'http://localhost:8070/like',
			type:'GET',
			dataType:'json',
			success:function(data){
				this.setState({likeData:data});
				// console.log(this.state.likeData);
			}.bind(this),
			error:function(){
				alert('error');
			}.bind(this)
		});
	},
	render:function(){
		console.log("6");
		var postDataNodes = this.props.postData.map(function(postData) {
	      return (      	
	      	<div key={postData.id}>
	        <EachPostComponent OneHandleDelete ={this.oneDltCmp}
	        AfterEditSave={this.editSave}
	        postContent={postData.postContent}
	        postTimekey={postData.postTime}
	        pic={this.props.picDetail}
	        likeGet={this.state.likeData}
	        id={postData.id} />   </div>      
	        
	      );
	    }.bind(this));
		return(
			<div className="EachPostComponentClass">
				{/*<ReactCSSTransitionGroup transitionName="example" 
			      	 transitionEnterTimeout={500}
			      	 transitionLeaveTimeout={300}>*/}
			      	
				{postDataNodes}
				{//picDataNodes
				}
				{ //</ReactCSSTransitionGroup>
				 }
			</div>
			);
		}
	});

module.exports=PostDisplayComment;