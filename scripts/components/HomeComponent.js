var React = require('react');
// var $ = require('jquery');
// var Masonry = require('../../node_modules/masonry-layout/masonry.js');
var MasonryMixin = require('react-masonry-mixin');

// var suggestionModel = require('../models/SuggestionModel.js');

var suggestionList = [];

var masonryOptions = {
	// transitionDuration: 0,
	columnWidth: 0,
	isFitWidth: true
};

module.exports = React.createClass({
	mixins: [MasonryMixin('grid', masonryOptions)],

	getInitialState: function() {
		return {
			suggArray: []
		}
	},
	render: function() 	{
		this.props.suggestions.models.reverse(); 

		var restEls = this.props.suggestions.map(function(suggestionModel) {
			return (
			  	<div className="box">
			        <img src={suggestionModel.get('photo')} />
			        <span className="caption fade-caption">
			        <h2 className="suggName">{suggestionModel.get('name')}</h2>
			        <p className="suggFood">{suggestionModel.get('food')}</p>
			        <p className="suggAdd">{suggestionModel.get('description')}</p>
			        </span>
			    </div>
			)
		});

		return (
			<div>
				<div className="homeContainer">
					<div className="bg-img">
						<div className="hello">Put Your City Where Your Mouth Is</div>
						<div className="hello2">Scroll for noms \/</div>
					</div>

					<div className="grid" ref="grid">
					  {restEls}

					</div>
				</div>
			</div>
		);
		
	}
});