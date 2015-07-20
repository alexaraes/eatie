var React = require('react');

module.exports = React.createClass({
	componentWillMount: function () {
	    this.props.user.on('change', function() {
	    	
	    	this.forceUpdate();

	    }, this);
	},
	render: function() {
		var loggedInNav = null;
		var links = [];
		var firstName = this.props.user.get('name');
		var userId = this.props.user.get('objectId');

		console.log(firstName);
		
		if(!this.props.user.id) {
			links.push(<li className="linkDiv"><a href="#home">HOME</a></li>);
			links.push(<li className="linkDiv"><a href="#login">SIGN IN</a></li>);
			links.push(<li className="linkDiv"><a href="#signup">SIGN UP</a></li>);
		}
		if (this.props.user.id) {

			loggedInNav = (
				<div>
					<ul>
						<li className="linkDiv"><a href="#home">HOME</a></li>
						<li className="linkDiv"><a href="#feed">ACTIVITY</a></li>
						<li className="linkDiv" onClick={this.onLogOut}><a href="#home">LOG OUT</a></li>
						<li className="greet">Hey, <a href={"#profile/"+userId}> {firstName}!</a></li>
					</ul>
				</div>
			);
		}
		return (
			<nav className="navbar">
				<div>{links}</div>
				<div>{loggedInNav}</div>
			</nav>
		);
	},
	onLogOut: function() {
		this.props.user.logout();
	}
});