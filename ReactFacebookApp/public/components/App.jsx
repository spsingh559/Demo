// Main Component 
// var ReactCSSTransitionGroup = require('.react-addons-css-transition-group');
// import PostDisplayComment from './PostDisplayComment.jsx';
// import PostComponent from './PostComponent.jsx';
// import MuiThemeProvider from 'material-ui/styles/muiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
var injectTapEventPlugin = require("react-tap-event-plugin");
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
injectTapEventPlugin();
import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var PostDisplayComment= require('./PostDisplayComment.jsx');
var PostComponent= require('./PostComponent.jsx'); 
const muiTheme = getMuiTheme({
  tooltip: {
    color: '#f1f1f1',
    rippleBackgroundColor: '#4F6AF2'
    // height:'50px'
  },
});

var FaceBookComponent=React.createClass({
	getInitialState:function(){
		return { 
			data:[],
			picData:[],
			open:false,
			message:'Default message',
			openDialogue:false
		};
	},
	// handleOpen:function(){
	// 	this.setState({openDialogue:true});
	// },
	handleClose:function(){
		this.setState({openDialogue:false});
	},
	componentWillMount: function() {
		$.ajax({
			url:'http://localhost:8070/post?friendsId=4&_sort=postTime&_order=DESC',
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
			url:'http://localhost:8070/friends/4',
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
			url:'http://localhost:8070/post',
			type:'POST',
			dataType:'json',
			data:dataforpost,
			success:function(){
				this.setState({open:true,
					message:'Your post has been posted successfully'});
				console.log("open"+this.state.open);
				console.log(this.state.message);
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
		this.setState({open:true,message:'post deleted successfully'});
		$.ajax({
			url:'http://localhost:8070/post/'+id,
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
                	url:'http://localhost:8070/post/'+id,
                	type:"PATCH",
                	data:obj,
                	success:function(){
                		this.setState({open:true,message:'Edit is done'});
                	}.bind(this),
                	error:function(error){
                		console.error(error);
                	}.bind(this)
                });

	},
	undo:function(){
		console.log("undo click");
		// this.openDialogue();
		this.setState({openDialogue:true});
	},
	handleRequest:function(){
		this.setState({open:false});
	},
	render:function(){
		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

		var sty={background:'#4F6AF2'};
		console.log("1");
				return(
					<MuiThemeProvider  muiTheme={muiTheme}>
			<div> 
				<Snackbar open={this.state.open}
				
				// autoHideDuration={4000}
				message={this.state.message}
				bodyStyle={sty}
				onRequestClose={this.handleRequest} //for autohide on button click
				 >
          </Snackbar>
				
				<div className="PostComponentClass">
					<PostComponent AfterPost={this.updatePost}
					picDetail={this.state.picData}/>
				</div>
				<div className="PostDisplayCommentClassa">
					<PostDisplayComment postData={this.state.data}
					picDetail={this.state.picData}
					onDlt={this.delete}
					onSave={this.edit}
					/>
				</div>
			</div>
			</MuiThemeProvider>
			);
	}
});

ReactDOM.render(<FaceBookComponent date={new Date()} />,
 document.getElementById('BindMainComponent'));
