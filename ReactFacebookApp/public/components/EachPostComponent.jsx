// import LikeComponent from './LikeComponent.jsx';
// import CommentComponent from './CommentComponent.jsx';

var CommentComponent= require('./CommentComponent.jsx'); 
var LikeComponent= require('./LikeComponent.jsx'); 
// import Avatar from 'material-ui/Avatar';

// import List from 'material-ui/List/List';
// import ListItem from 'material-ui/List/ListItem';
import {Card, CardActions,CardHeader,CardMedia,CardTitle,CardText}
from 'material-ui/Card'
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
// import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';


var EachPostComponent =React.createClass({
	getInitialState:function(){
		return {
			editBtn:false,
			postText:'',
			displayInfo:false,
			expanded:false
				};
				console.log("expand is" + expanded);
	},
	handleExpandChange:function(expanded){
		console.log("expand change");
		this.setState({expanded:expanded});
	},
	handleExpand:function(){
		console.log("expand");
		this.setState({expanded:true});
	},

  handleToggle:function(toggle) {
  	console.log("toggle");
    this.setState({expanded: toggle});
  },

   handleReduce:function() {
   	console.log("reduce");
    this.setState({expanded: false});
  },
	handleTextChange:function(e){
		e.preventDefault();
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
	var CardStyle={background:'#A7DFF3'}
	var txtStyle={color:'white'}
	

	// var Avatarstyle = {margin: 5};
	// display Information
	if(this.state.displayInfo==true){
		return(
			<div className="col-sm-8" style={style}>
			<Paper  zDepth={5} >
			<Card>
			<CardHeader style={CardStyle}
			>
			<span className="glyphicon glyphicon-backward pull-left" 
				      data-toggle="tooltip"
				      title="Back"
				      onClick={this.demo}
				  /> 
				  <p className="pull-right">{this.props.pic.name} </p>
				  </CardHeader>
				  
				         
		          			<CardText>
		         	 	<p>Name: 	{this.props.pic.name} </p><hr></hr>
		         	 	<p>Email Id: {this.props.pic.email} </p><hr></hr>
		         	 	<p>Phone No: {this.props.pic.phone} </p><hr></hr>
		         	 	<p>Address: {this.props.pic.address} </p>
		         	 	</CardText>
		        	</Card>
		      	</Paper>
    		</div>
			);
	}
	if(this.state.editBtn==true){
		return(
			<div className="EachPostPanel" >
				<div className="col-sm-8" style={style}>
				<Paper  zDepth={5} >
				<Card>
					<CardHeader style={CardStyle}
					avatar src="{this.props.pic}" >
					<h4 className="pull-right">
		         			 {/*<span className="glyphicon glyphicon-ok" 
		         			 		         			 data-toggle="tooltip"
		         			 		         			 title="Save the post" 
		         			 		          			 onClick={this.handleEditSave}
		         			 		          			 /> {' '} 
		         			 		          			 <span className="glyphicon glyphicon-remove"
		         			 		         			 data-toggle="tooltip"
		         			 		           			 title="Cancel the Change"
		         			 		           			 onClick={this.handleEditCancel} 
		         			 		           			 />*/}
		         			<IconButton tooltip="Save this Post"
		         				onClick={this.handleEditSave}>
		         				<img src="image/ic_done_black_24dp_1x.png" />
		         		   </IconButton>
		         		   <IconButton tooltip="close"
		         		   onClick={this.handleEditCancel}>
		         		   <img src="image/ic_close_black_24dp_1x.png" />
		         		   </IconButton>
		          			</h4>
		          			</CardHeader>
		          			<CardText>
				<div className="message-wrapper" >
								{/*<form role="form">
									<div className="form-group">
										<textarea className="form-control" 
										rows="5"
										defaultValue={this.props.postContent}
										onChange={this.handleTextChange}
										 id="comment"></textarea>
									</div>
								</form>	*/}
								{// <TextField 
								// floatingLabelText="Edit your post"
								// defaultValue={this.props.postContent}
								// onChange={this.handleTextChange}
								// multiLine={true}
								// id={"editPostTextId"}
								// type={"text"}
								// rows={3}
								// onKeyDown ={this.handleEditSave} />
							}
								<TextField
			     floatingLabelText="Edit your Post"
			      multiLine={true}
			      style={txtStyle}
				textareaStyle={txtStyle}
				// value={this.state.postText}
			      onChange={this.handleTextChange}
			      defaultValue={this.props.postContent}
			      rows={2}
			      rowsMax={4} 
    			/>

							</div>		
				</CardText>
				</Card>
				</Paper>
				
    			</div>
			</div>
		);
	}
	else{
		// console.log(count);
	return(
		<div className="EachPostPanel" >
		<div className="col-sm-8" style={style}>
		
			<Card showExpandableButton={true}>
			<Paper  zDepth={3} >
				<CardHeader title="ram has posted"
				style={CardStyle}
				subtitle={this.props.postTimekey}
				avatar="{this.props.pic}"
				
				// onClick={this.handlePhoto} 
				>
					{/*<h4 className="pull-right">
										<IconButton tooltip="Delete the post!"
											onClick={this.handleDelete}>
										    <img src="image/ic_delete_black_24dp_1x.png"/>
										</IconButton> 
							            <IconButton tooltip="Edit the post!"
							                onClick={this.handleEdit} >
							                <img src="image/ic_mode_edit_black_24dp_1x.png" /> 
							           	</IconButton>
							           	</h4> */}
							           	<h4 className="pull-right">
							           	 <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      <MenuItem  onClick={this.handleEdit}>
	      <IconButton  > 
	        <img src="image/ic_mode_edit_black_24dp_1x.png" /> 
	   	</IconButton>
	</MenuItem>
      <MenuItem  onClick={this.handleDelete}>
      <IconButton >
		    <img src="image/ic_delete_black_24dp_1x.png"/>
	  </IconButton>
 	</MenuItem>
    </IconMenu></h4>
				</CardHeader>
				 
				<CardText expandable={true} >
				{this.props.postContent}
				</CardText>
				<Divider /></Paper><Paper zDepth={1}>
				<CardActions>
      <div style={footerStyle}>
		        	<div className="pull-left">
		        	<LikeComponent likeCount={count} />
		        	</div>
		        	<div className="pull-right">
		        	<CommentComponent />
		        	</div>
		      	</div>
      			</CardActions>
      			
		      	</Paper>
				</Card>
				
				</div>
			
		</div>
		);
}
}
});

module.exports=EachPostComponent;