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
			links.push(<li className="navLink2"><a href="#home">eatie</a></li>);
			links.push(<li className="navLink"><a href="#login">sign in</a></li>);
			links.push(<li className="navLink"><a href="#signup">sign up</a></li>);
		}
		if (this.props.user.id) {

			loggedInNav = (
				<nav>
					<ul className="navUl">
						<li className="navLink2"><a href="#home">eatie</a></li>
						<li className="navLink"><a href="#feed">activity</a></li>
						<li className="navLink" onClick={this.onLogOut}><a href="#home">log out</a></li>
						<li className="greet">Hey, <a href={"#profile/"+userId}> {firstName}!</a></li>
					</ul>
				</nav>
			);
		}
		return (
			<div className="navbar">
				<div>{links}</div>
				<div>{loggedInNav}</div>
			</div>
		);
	},
	onLogOut: function() {
		this.props.user.logout();
	}
});