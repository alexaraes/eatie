var React = require('react');
var _ = require('../../node_modules/underscore/underscore-min.js');
var PostModel = require('../models/PostModel.js');
var PostCollection = require('../collections/PostCollection.js');
var SuggestionModel = require('../models/SuggestionModel.js');
var SuggestionCollection = require('../collections/SuggestionCollection.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			errors:{}
		}
	},
	render: function() {

		var postEls = this.props.posts.map(function(postModel) {
			return (
			  <div className="grid-item">
			  	<img src={postModel.get('image')}/>
			  	<div className="categoryDiv">{postModel.get('caption')}</div>
			  </div>	
			)
		});

		var dropdownOptions = this.props.suggestions.map(function(suggestionModel) {
			return (
				<option>{suggestionModel.get('name')}</option>
			)
		})

		return (
			<div className="shareContainer">
				<div className="shareTitle">So what did you think?</div>
				<form className="shareForm" type='submit'  onSubmit={this.shareSubmit} >
					
					<div className="shareLabel">Where did you go?</div>
					<div>
						<select className="shareInput">
							<option>Choose a restaurant!</option>
							{dropdownOptions}
						</select>
					</div>
					<div className="errorText">{this.state.errors.url}</div>

					<div className="shareLabel">How was it?</div>

					<div className="shareRate"><input className="shareInput" type="checkbox" ref="caption" />It was so tasty!</div>

					<div className="shareRate">
						<input className="shareInput" type="checkbox" ref="caption" />It was okay...
					</div>

					<div className="shareRate">
						<input className="shareInput" type="checkbox" ref="caption" />It was a bad choice.
					</div>

					<button className="shareButton" type="submit">Share!</button>
				</form>
				{postEls}
			</div>
		)
	},
	shareSubmit: function(e) {
		e.preventDefault();

		var that = this;
		var errors = {};

		var newPost = new PostModel({
			image: this.refs.url.getDOMNode().value,
			caption: this.refs.caption.getDOMNode().value,
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
			    	that.props.myApp.navigate('/profile/'+this.props.user.get('objectId'), {trigger: true});
			        
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