//child Component
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions,CardHeader,CardMedia,CardTitle,CardText}
from 'material-ui/Card'
import Paper from 'material-ui/Paper';

var PostComponent=React.createClass({
	getInitialState:function(){
		return{postText:'', file: '',   imagePreviewUrl: ''};
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
				avatar src={this.props.picDetail} ></CardHeader>
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
				</Card>
				</Paper>
					{/*<form role="form">
											<div className="form-group">
												<textarea className="form-control" 
												rows="5"
												value={this.state.postText}
												onChange={this.handleTextChange}
												 id="comment"></textarea>
											</div>
										</form>	*/}
					{/*<input type="button" 
					className="btn btn-large btn-primary pull-right" 
					id="btnAlertTextArea" value="post"
					onClick={this.Submit} /> */
				}
				{/*<TextField floatingLabelText="what's in your mind?"
				onChange={this.handleTextChange}
				value={this.state.postText}
				rows={5}
				onKeyDown={this.Submit} 
				id={"comment"}
				type={"text"}
				multiLine={true}
				// type={text} 
				/> */}
				
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