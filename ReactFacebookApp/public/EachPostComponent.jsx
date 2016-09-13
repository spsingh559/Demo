// import LikeComponent from './LikeComponent.jsx';
// import CommentComponent from './CommentComponent.jsx';

var CommentComponent= require('./CommentComponent.jsx'); 
var LikeComponent= require('./LikeComponent.jsx'); 

var EachPostComponent =React.createClass({
	getInitialState:function(){
		return {editBtn:false,postText:'',displayInfo:false	};
	},
	handleTextChange:function(e){
		this.setState({postText:e.target.value});
	},
	handleDelete:function(e){
		e.preventDefault();
		var value=this.props.id;
		this.props.OneHandleDelete(value);
	},
	handleEdit:function(){
		this.setState({editBtn:true})
	},
	handleEditCancel:function(){
		this.setState({editBtn:false});
	},
	handleEditSave:function(e){
		e.preventDefault();
		 if (!this.state.postText) {
      		return;
   		 }
   		 var editObj={
   		 	friendsId:4,
   		 	postContent:this.state.postText
   		 };
		 this.props.AfterEditSave(editObj,this.props.id);
			this.setState({postText:""});
	},
	handlePhoto:function(){
		this.setState({displayInfo:true});
	},
	demo:function(){
		this.setState({displayInfo:false});
		this.setState({editBtn:false});
	},
	// componentWillMount:function(){
	// 	console.log(this.props.likeGet);
	// },
render:function(){
	
	var count=0;
	for (var n = 0 ; n < this.props.likeGet.length ; n++) {
   		 if (this.props.likeGet[n].postID == this.props.id) {
     	 	count++;
    		}
		}
	//console.log(count);
	var style={marginTop:"20px"};
	var footerStyle={overflow:"auto"};
	var imageStyle={width:"30px", height:"30px"};
	// display Information
	if(this.state.displayInfo==true){
		return(
			<div className="col-sm-8" style={style}>
				 <div className="panel panel-default panel-primary AtomText">
		       		 <div className="panel-heading">
				          <h4 className="panel-title" style={footerStyle}>
				          <span className="glyphicon glyphicon-backward pull-left" 
				          	onClick={this.demo} data-toggle="tooltip"
				          	title="Back"
				          	 />
				           <p className="pull-right">{this.props.pic.name} </p>
				         	</h4>
		        	 </div>
		        	 <div className="panel-body">
		         	 	<p>Name: 	{this.props.pic.name} </p><hr></hr>
		         	 	<p>Email Id: {this.props.pic.email} </p><hr></hr>
		         	 	<p>Phone No: {this.props.pic.phone} </p><hr></hr>
		         	 	<p>Address: {this.props.pic.address} </p>
		        	</div> 
		      	</div>
    		</div>
			);
	}
	if(this.state.editBtn==true){
		return(
			<div className="EachPostPanel" >
				<div className="col-sm-8" style={style}>
					<div className="panel panel-default panel-primary AtomText">
		       			 <div className="panel-heading">
		         			 <h4 className="panel-title" style={footerStyle}>
		         			<img src={this.props.pic.picture}
				         	 className="img-responsive img-thumbnail"
				         	 style={imageStyle} 
				           	 /> has posted  			 
		        			 <p className="pull-right">{this.props.postTimekey}{" "}
		         			 <span className="glyphicon glyphicon-ok" 
		         			 data-toggle="tooltip"
		         			 title="Save the post" 
		          			 onClick={this.handleEditSave}
		          			 /> {' '} 
		          			 <span className="glyphicon glyphicon-remove"
		         			 data-toggle="tooltip"
		           			 title="Cancel the Change"
		           			 onClick={this.handleEditCancel} 
		           			 />
		          			</p></h4>
		       			 </div>
		      			 <div className="panel-body">
				         	<div className="message-wrapper" >
								<form role="form">
									<div className="form-group">
										<textarea className="form-control" 
										rows="5"
										defaultValue={this.props.postContent}
										onChange={this.handleTextChange}
										 id="comment"></textarea>
									</div>
								</form>	
							</div>							
		        		</div> 
		     		 </div>
    			</div>
			</div>
		);
	}
	else{
		// console.log(count);
	return(
		<div className="EachPostPanel" >
			<div className="col-sm-8" style={style}>
				 <div className="panel panel-default panel-primary AtomText">
		       		 <div className="panel-heading">
				          <h4 className="panel-title" style={footerStyle}>
				          <img src={this.props.pic.picture}
				          className="img-responsive img-thumbnail"
				           style={imageStyle}
				           data-toggle="tooltip"
				           title={this.props.pic.name}
				           onClick={this.handlePhoto}
				           /> jeevan has posted
				          <p className="pull-right">{this.props.postTimekey}{" "}
				          <span className="glyphicon glyphicon-trash dltBtn" 
				           data-toggle="tooltip"
				           title="Delete the post!" 
				           onClick={this.handleDelete}/> {' '} 
				          	<span className="glyphicon glyphicon-edit"
				         	 data-toggle="tooltip"
				           	title="Edit the post!"
				           	onClick={this.handleEdit} 
				           	 />
				          	</p></h4>
		        	 </div>
		        	 <div className="panel-body">
		         	 	<p> {this.props.postContent} </p>
		        	</div> 
		        	<div className="panel-footer panel-primary" style={footerStyle}>
		        	<div className="pull-left">
		        	<LikeComponent likeCount={count} />
		        	</div>
		        	<div className="pull-right">
		        	<CommentComponent /></div>
		        	</div>
		      	</div>
    		</div>
		</div>
		);
}
}
});

module.exports=EachPostComponent;