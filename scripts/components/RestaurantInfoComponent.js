var React = require('react');
var SuggestionModel = require('../models/SuggestionModel.js');

module.exports = React.createClass({
	getInitialState: function() {
		this.forceUpdate();
	},
	componentWillMount: function(){ 
      google.maps.event.addDomListener(window, 'load', this.initialize());  

    },
    initialize: function() {

		console.log(this.props.suggestions);
		console.log('lat:'+ this.props.suggestions.models[0].attributes.lat);
		console.log('long:'+ this.props.suggestions.models[0].attributes.lng);

		var myLat = this.props.suggestions.models[0].attributes.lat;
		var myLng = this.props.suggestions.models[0].attributes.lng;

		var myLatlng = new google.maps.LatLng(myLat,myLng);

		console.log(myLatlng);

		var mapOptions = {
          center: myLatlng,
          zoom: 8
        };

        var newMap = new google.maps.Map(document.querySelector('map-canvas'),
            mapOptions);
	},
	render: function() {
		console.log('render function');
		google.maps.event.addDomListener(window, 'load', this.initialize());
		return (

			<div className="map-canvas">
				
			</div>
		)
	}
});