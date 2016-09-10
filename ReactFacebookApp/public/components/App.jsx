// Main Component 
// var ReactCSSTransitionGroup = require('.react-addons-css-transition-group');
var FaceBookComponent=React.createClass({
	getInitialState:function(){
		return { data:[],picData:[]};
	},
	componentWillMount: function() {
		$.ajax({
			url:'http://localhost:8080/post?friendsId=4&_sort=postTime&_order=DESC',
			type:'GET',
			dataType:'json',
			success:function(data){
				this.setState({
					data: data
				});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(status);
			}.bind(this)
		});
		$.ajax({
			url:'http://localhost:8080/friends/4',
			type:'GET',
			dataType:'json',
			success:function(data){
				this.setState({
					picData: data
				});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(status);
			}.bind(this)
		});
	},
	updatePost:function(postText){
		var datetime = this.props.date.getDate() + "/"
                + (this.props.date.getMonth()+1)  + "/" 
                + this.props.date.getFullYear() + " @ "  
                + this.props.date.getHours() + ":"  
                + this.props.date.getMinutes() + ":" 
                + this.props.date.getSeconds();
		var dataCurrentState=this.state.data;
		var dataforpost={
			friendsId:4,
			postContent:postText,
			postTime:datetime
		};
		// dataforpost.id=Date.now();
		// console.log("current data");
		// console.log(dataforpost);
		var newPostData=[dataforpost].concat(dataCurrentState);
		this.setState({
					data: newPostData
				});
		$.ajax({
			url:'http://localhost:8080/post',
			type:'POST',
			dataType:'json',
			data:dataforpost,
			success:function(){
			}.bind(this),
			error:function(xhr,status,err){
				console.error(status);
			}.bind(this)
		});
	},
	delete:function(id){
		console.log("value of id" + id);
		var currentData=this.state.data;
		for (var n = 0 ; n < currentData.length ; n++) {
   		 if (currentData[n].id == id) {
     	 	var removedObject = currentData.splice(n,1);
     	 	removedObject = null;
      		break;
    		}
		}
		this.setState({data: currentData});
		$.ajax({
			url:'http://localhost:8080/post/'+id,
			type:'DELETE',
			dataType:'json',
			success:function(){
			}.bind(this),
			error:function(xhr,status,err){
				console.error(status);
			}.bind(this)
		});
	},
	edit:function(obj,id){
		var datetime = this.props.date.getDate() + "/"
                + (this.props.date.getMonth()+1)  + "/" 
                + this.props.date.getFullYear() + " @ "  
                + this.props.date.getHours() + ":"  
                + this.props.date.getMinutes() + ":" 
                + this.props.date.getSeconds();
                obj.postTime=datetime;
                var currentData=this.state.data;
				for (var n = 0 ; n < currentData.length ; n++) {
   				 if (currentData[n].id == id) {
     	 			var editObject = currentData.splice(n,1,obj);
     	 			editObject = null;
      				break;
    				}
				}
				this.setState({data:currentData});
                $.ajax({
                	url:'http://localhost:8080/post/'+id,
                	type:"PATCH",
                	data:obj,
                	success:function(){
                	}.bind(this),
                	error:function(error){
                		console.error(error);
                	}.bind(this)
                });
	},
	render:function(){
				return(
			<div> 
				<div className="PostComponentClass">
					<PostComponent AfterPost={this.updatePost}/>
				</div>
				<div className="PostDisplayCommentClass">
					<PostDisplayComment postData={this.state.data}
					picDetail={this.state.picData}
					onDlt={this.delete}
					onSave={this.edit}
					/>
				</div>
			</div>
			);
	}
});

//child Component
var PostComponent=React.createClass({
	getInitialState:function(){
		return{postText:''};
	},
	handleTextChange:function(e){
		this.setState({postText:e.target.value});
		// console.log("text chnge handle" + this.state.postText);
	},
	Submit:function(e){
		 e.preventDefault();
		 if (!this.state.postText) {
      		return;
   		 }
		this.props.AfterPost(this.state.postText);
		this.setState({	postText:""});
	},
	render:function(){
		return(
			<div className="col-sm-8">
				<div className="message-wrapper" >
					<form role="form">
						<div className="form-group">
							<textarea className="form-control" 
							rows="5"
							value={this.state.postText}
							onChange={this.handleTextChange}
							 id="comment"></textarea>
						</div>
					</form>	
					<input type="button" 
					className="btn btn-large btn-primary pull-right" 
					id="btnAlertTextArea" value="post"
					onClick={this.Submit} />
				</div>							
			</div>
			);
	}
});

var PostDisplayComment=React.createClass({
	getInitialState:function(){
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
			url:'http://localhost:8080/like',
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
				           /> has posted
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

var LikeComponent=React.createClass({
	getInitialState:function(){
		// console.log("initial State count"+this.props.likeGet.length);
		//console.log("like compo" + this.props.likeCount);
		//console.log(this.props.likeCount);
		return{liked:false,likeCounts:0};
		 // console.log("like After"+ this.state.likeCounts );
	},
	likeClicked:function(){
			if(this.state.liked==true){
				this.setState({likeCounts:this.state.likeCounts-1,
					liked:!this.state.liked });
			}
			else{
				this.setState({likeCounts:this.state.likeCounts+1,
					liked:!this.state.liked });
			}
			 // this.props.likePost(this.state.);
	},
	render:function(){
		//console.log(this.props.likeCount);
		// console.log("like" +this.state.likeCounts);
		var likedStyle={ color:'blue'};
 		// console.log("render " +this.props.likeGet.length);
		if(this.state.liked==true){
		return(
			<div>
			<span className="glyphicon glyphicon-thumbs-up"
					style={likedStyle}
		        	data-toggle="tooltip"
		        	title="Like this Post" 
		        	onClick={this.likeClicked}
		        	/>
		        	<span >{''}{this.props.likeCount}</span>
			</div>
			);
		}
		else{
			return(
			<div>
			<span className="glyphicon glyphicon-thumbs-up"
		        	data-toggle="tooltip"
		        	title="Like this Post" 
		        	onClick={this.likeClicked}
		        	/>
		        	<span >{''}{this.props.likeCount} </span>
			</div>
			);
		}
	
}
});

var CommentComponent=React.createClass({
	getInitialState:function(){
		return{text:false}
	},
	render:function(){
		return(
			<div>
			<span className="glyphicon glyphicon-comment"
		        	data-toggle="tooltip"
		        	title="Comment this Post" />
		        	
			</div>
			);
	}
});

ReactDOM.render(<FaceBookComponent date={new Date()} />,
 document.getElementById('BindMainComponent'));