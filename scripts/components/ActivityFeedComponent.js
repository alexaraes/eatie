var React = require('react');
var _ = require('../../node_modules/underscore/underscore-min.js');
var PostModel = require('../models/PostModel.js');
var PostCollection = require('../collections/PostCollection.js');

module.exports = React.createClass({
	getInitialState: function() {
		console.log('getInitialState');
		var that = this;

		// return {
		// 	errors:{}
		// }
		
		var posts = new PostCollection();
		console.log(posts);

		posts.fetch();
		
		posts.on('sync', function() {
			console.log('sync!!!');
			that.forceUpdate();
		});
		console.log(posts);
		return {
			errors:{},
			posts: posts
		};
	},
	render: function() {
		var that = this;
		this.state.posts.models.reverse(); 

		var postList = this.state.posts.map(function(postModel) {
			return (
				<div className="postlistDiv">
					<span className="subName">{postModel.get('userName')} went to </span>
					<span className="subRestaurant">{postModel.get('restaurant')} </span>
					<span className="subRate">and {postModel.get('rating')}</span>
				</div>
			);
		});

		return (
			<div className="shareContainer">
				<div className="postHeader">What are people saying?</div>
				{postList}
			</div>
		)
	}
});