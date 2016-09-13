
import IconButton from 'material-ui/IconButton';
var CommentComponent=React.createClass({
	getInitialState:function(){
		return{text:false}
	},
	render:function(){
		return(
			
			<IconButton >
			<img src="image/ic_comment_black_24dp_1x.png" />
			</IconButton>
			
			
			);
	}
});

module.exports=CommentComponent;