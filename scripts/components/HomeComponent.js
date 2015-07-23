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
				  	<div id="grid" className="box">
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
					<div className="homeContainer">
						<div className="bg-img">
							<div className="fadeDiv">
								<div className="hello">eatie</div>
								<div className="hello2">Put your city where your mouth is.</div>
								<div className="arrow-down" onClick={this.scrollDown} ></div>
							</div>
						</div>
						<div id="categories" className="categories">
							<div className="catDiv"><span className="catLink"><a href="#category/Burger">Burger</a></span>
							<span className="catLink"><a href="#category/Comfort">Comfort</a></span>
							<span className="catLink"><a href="#category/Drinks">Drinks</a></span>
							<span className="catLink"><a href="#category/Fusion">Fusion</a></span></div>
							<div className="catDiv"><span className="catLink"><a href="#category/Pizza">Pizza</a></span>
							<span className="catLink"><a href="#category/Sandwiches">Sandwiches</a></span>
							<span className="catLink"><a href="#category/Sushi">Sushi</a></span>
							<span className="catLink"><a href="#category/Tex-Mex">Tex-Mex</a></span></div>
						</div>
						<div className="grid" ref="grid">
						  {restEls}
						</div>
					</div>
		);	
	},
	scrollDown: function() {
		$('html, body').animate({
	        scrollTop: $("#categories").offset().top
	    }, 1000);
	}
});