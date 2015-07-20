var React = require('react');
var _ = require('../../node_modules/underscore/underscore-min.js');
var PostModel = require('../models/PostModel.js');
var PostCollection = require('../collections/PostCollection.js');

module.exports = React.createClass({
	getInitialState: function() {
		var that = this;

		return {
			errors:{}
		}
		
		var posts = new PostCollection();

		posts.fetch();
		
		posts.on('change', function() {
			that.forceUpdate();
		});
		console.log(posts);
		return {
			posts: posts
		};
	},
	render: function() {

		this.props.posts.models.reverse(); 

		var postList = this.props.posts.map(function(postModel) {
			return (
				<div className="submitted">
					<span className="subName">{this.props.posts.get('userName')}</span>
					<span className="subRestaurant">{this.props.posts.get('restaurant')}</span>
					<span className="subRate">{this.props.posts.get('rating')}</span>
				</div>
			);
		});

		return (
			<div className="shareContainer">
				{postList}
			</div>
		)
	}
});