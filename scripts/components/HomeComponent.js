var React = require('react');
// var $ = require('jquery');
// var Masonry = require('../../node_modules/masonry-layout/masonry.js');
var MasonryMixin = require('react-masonry-mixin');

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
				  	<a href={"#info/"+suggestionModel.get('objectId')}>
				        <img src={suggestionModel.get('photo')} />
				        <span className="caption fade-caption">
				        <h2 className="suggName">{suggestionModel.get('name')}</h2>
				        <p className="suggFood">{suggestionModel.get('food')}</p>
				        <p className="suggAdd">{suggestionModel.get('description')}</p>
				        </span>
				        </a>
				    </div>
			)
		});

		return (
			<div>
				<div className="homeContainer">
					<div className="bg-img">
						<div className="fadeDiv">
							<div className="hello">Eatie</div>
							<div className="hello2">Put your city where your mouth is.</div>
							<div className="arrow-down"></div>
						</div>
					</div>

					<div className="grid" ref="grid">
					  {restEls}
					</div>
				</div>
			</div>
		);
		
	}
});