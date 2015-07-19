var React = require('react');
var SuggestionModel = require('../models/SuggestionModel.js');

module.exports = React.createClass({
	getInitialState: function() {
		console.log(this.props.suggestions);
		console.log('lat ', this.props.suggestions.get.('lat'));
        console.log('lng ', this.props.suggestions.get.('lng'));

		var myLatlng = new google.maps.LatLng(this.props.suggestions.get('lat'),this.props.suggestions.get.('lng'));

		console.log(myLatlng);

		var mapOptions = {
          center: {myLatlng},
          zoom: 8
        };

        var newMap = new google.maps.Map(document.querySelector('map-canvas'),
            mapOptions);
	},
	componentDidUpdate: function(){ 
      google.maps.event.addDomListener(window, 'load', this.initialize());    
    },
	render: function() {
		console.log(this.props.suggestions);
		
		return (

			<div className="map-canvas">
				
			</div>
		)
	}
});