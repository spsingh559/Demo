//child Component
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions,CardHeader,CardMedia,CardTitle,CardText}
from 'material-ui/Card'
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';

var PostComponent=React.createClass({
	getInitialState:function(){
		return{postText:'', file: '',   imagePreviewUrl: '',prog:false};
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
		this.setState({
			prog:true 
		});
	},
	 _handleImageChange:function(e) {
   			 e.preventDefault();

		   		 let reader = new FileReader();
		    let file = e.target.files[0];

		    reader.onloadend = () => {
		      this.setState({
		        file: file,
		        imagePreviewUrl: reader.result
		      });
		    }

		    reader.readAsDataURL(file)
  },
	render:function(){
		var progesss=this.state.prog?
		<LinearProgress mode="indeterminate" />:null;
		console.log("3");
		const style = {
  margin: 12,
};
var cardStyle ={background:'#4F6AF2'};
let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }
    var txtStyle={color:'white'};
		return(
			<div>
			<div className="col-sm-8">
				<div className="message-wrapper" >
				<Paper zDepth={5}>
				<Card style={cardStyle}>
				<CardHeader 
				title="Your Post Wall"
				avatar ="{this.props.picDetail.picture}" ></CardHeader>
				<CardText>
				<TextField
				// inputStyle={txtStyle}
				floatingLabelStyle={txtStyle}
				 style={txtStyle}
				textareaStyle={txtStyle}
			     floatingLabelText="what's in your mind?"
			      multiLine={true}
			      value={this.state.postText}
			      onChange={this.handleTextChange}
			      rows={2}
			      rowsMax={4} 
    			/>
				 <RaisedButton label="Post" 
				 primary={true} className="pull-right"
				  style={style} onTouchTap={this.Submit} />
				 </CardText>
				 <CardActions>
				 {progesss}
				 </CardActions>
				</Card>
				</Paper>
				
				</div>							
			</div>
			<div className="col-sm-4">
			
        <form onSubmit={this._handleSubmit}>
          <input type="file" onChange={this._handleImageChange} />
           <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
        </form>
        {$imagePreview}
      
			</div>
			</div>
			);
	}
});

module.exports=PostComponent;