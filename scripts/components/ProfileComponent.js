var React = require('react');
var _ = require('../../node_modules/underscore/underscore-min.js');
var PostModel = require('../models/PostModel.js');
var PostCollection = require('../collections/PostCollection.js');

module.exports = React.createClass({
	getInitialState: function() {
		var that = this;
		
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

		var postChoices = this.props.suggestions.map(function(suggestionModel) {
			return (
					<option>{suggestionModel.get('name')}</option>
			);
		});

		return (
			<div className="shareContainer">
				<div className="shareTitle">Share your experience!</div>
				<form className="shareForm" type='submit'  onSubmit={this.shareSubmit} >
					<label className="shareLabel">Where did you go?</label>
						<select ref="restaurant">{postChoices}</select>
					<label className="shareLabel">What did you think?</label>
					<select ref="rating">
						<option>You thought...</option>
						<option>loved it!</option>
						<option>thought it was meh...</option>
						<option>hated it!</option>
					</select>
					<button className="shareBtn">Share it!</button>
				</form>
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
			userId: this.props.user.get('objectId'),
			userName: this.props.user.get('name')
		});

		if (!newPost.get('restaurant')) {
			errors.name = 'please choose a restaurant';
		}
		if (!newPost.get('rating')) {
			errors.food = 'how did you like it?';
		}

		console.log(this.props.user.get('objectId'));
		console.log('props ', this.props);
		console.log(newPost);

		if(_.isEmpty(errors)) {
			console.log('post save attempt');

			newPost.save(
				null, 
				{
			    success: function(postModel) {
			    	console.log('post was posted');
			    	that.props.myApp.navigate('feed', {trigger: true});
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