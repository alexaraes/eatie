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
		
		var posts = new PostCollection({
			objectId: this.props.userId
		});

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

		var userShares = this.props.posts.map(function(postCollection) {
			return (
				<div className="postListDiv">
					<div>
						<h1 className="postTitle">{this.state.posts.get('restaurant')}</h1>
						<p className="postBody">{this.state.posts.get('rating')}</p>
					</div>
				</div>
			);
		});

		return (
			<div className="shareContainer">
				<div className="shareTitle">Share your experience!</div>
				<form className="shareForm" type='submit'  onSubmit={this.shareSubmit} >
					<input type="text" ref="restaurant" />
					<input type="text" ref="rating" />
				</form>
				{userShares}
			</div>
		)
	},
	shareSubmit: function(e) {
		e.preventDefault();

		var that = this;
		var errors = {};

		var newPost = new PostModel({
			restaurant: this.refs.restaurant.getDOMNode().value,
			rating: this.refs.rating.getDOMNode().value,
			userId: this.props.user.get('objectId')
		});

		console.log(this.props.user.get('objectId'));

		console.log(newPost);

		if (!newPost.get('url')) {
			errors.url = 'please copy and paste your image url';
		}

		if(_.isEmpty(errors)) {

			newPost.save(
				null, 
				{
			    success: function(postModel) {
			    	that.props.myApp.navigate('/profile/'+this.props.user.get('username'), {trigger: true});
			        
			    },
			    error: function(postModel, response) {
			    	that.refs.serverError.getDOMNode().innerHTML = response.responseJSON.error;
			        console.log('post was not posted', response.responseJSON);
			    }
			});
		}

		else {
			that.setState({errors: errors});
		}
	}
});