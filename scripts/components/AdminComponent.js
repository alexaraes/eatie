var React = require('react');
var _ = require('../../node_modules/underscore/underscore-min.js');
var SuggestionModel = require('../models/SuggestionModel.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			errors:{}
		}
	},
	render: function() {
		return (
			<div>
				<form className="admin" type="submit" ref="newSugg" onSubmit={this.register}>
					<div>Hello there!</div>

					<label>Restaurant Name</label><br />
					<input type="text" ref="name" /><br />
					<div className="errorText">{this.state.errors.name}</div>

					<label>Food</label><br />
					<input type="text" ref="food" /><br />
					<div className="errorText">{this.state.errors.food}</div>

					<label>Picture</label><br />
					<input type="text" ref="photo" /><br />
					<div className="errorText">{this.state.errors.photo}</div>

					<label>Address</label><br />
					<input type="text" ref="address" /><br />
					<div className="errorText">{this.state.errors.address}</div>

					<label>Latitude</label><br />
					<input type="text" ref="lat" /><br />
					<div className="errorText">{this.state.errors.lat}</div>
					<div className="errorText" ref="serverError"></div>

					<label>Longitude</label><br />
					<input type="text" ref="long" /><br />
					<div className="errorText">{this.state.errors.lng}</div>

					<label>Category</label><br />
					<input type="text" ref="category" /><br />
					<div className="errorText">{this.state.errors.category}</div>

					<label>Description</label><br />
					<input type="text" ref="description" /><br />
					<div className="errorText">{this.state.errors.descrip}</div>

					<button type="submit">Submit</button><br />
				</form>
			</div>
		)
	},
	register: function(e) {
		e.preventDefault();

		var that = this;
		var errors = {};

		var newSuggestion = new SuggestionModel({
			name: this.refs.name.getDOMNode().value,
			food: this.refs.food.getDOMNode().value,
			photo: this.refs.photo.getDOMNode().value,
			address: this.refs.address.getDOMNode().value,
			lat: this.refs.lat.getDOMNode().value,
			lng: this.refs.long.getDOMNode().value,
			category: this.refs.category.getDOMNode().value,
			description: this.refs.description.getDOMNode().value
		});

		if (!newSuggestion.get('name')) {
			errors.name = 'please enter the name of the restaurant';
		}
		if (!newSuggestion.get('food')) {
			errors.food = 'please enter a food item';
		}
		if (!newSuggestion.get('photo')) {
			errors.photo = 'please enter a photo';
		}
		if (!newSuggestion.get('address')) {
			errors.address = 'please enter the restaurant\'s address';
		}
		if (!newSuggestion.get('lat')) {
			errors.lat = 'please enter the latitude';
		}
		if (!newSuggestion.get('lng')) {
			errors.lng = 'please enter the longitude';
		}
		if (!newSuggestion.get('category')) {
			errors.category = 'please enter this food\'s category';
		}
		if (!newSuggestion.get('description')) {
			errors.descrip = 'please enter a short description';
		}

		console.log(errors);
		if(_.isEmpty(errors)) {

			newSuggestion.save(
				null, 
				{
			    success: function(suggModel) {
			    	that.props.myApp.navigate('home', {trigger: true});
			        console.log(newSuggestion);
			    },
			    error: function(suggModel, response) {
			    	that.refs.serverError.getDOMNode().innerHTML = response.responseJSON.error;
			        console.log('suggestion was not saved', response.responseJSON);
			    }
			});
		}

		else {
			that.setState({errors: errors});
		}
	}
});