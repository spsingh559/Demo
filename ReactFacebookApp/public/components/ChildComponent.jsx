var ChildComponent=React.createClass({
	render:function(){
		return(
			<div> {this.props.parentMessage}
			</div>
			);
	}
});