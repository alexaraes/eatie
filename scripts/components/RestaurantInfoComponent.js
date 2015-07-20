var React = require('react');
var SuggestionModel = require('../models/SuggestionModel.js');

module.exports = React.createClass({
	// getInitialState: function() {
	// 	this.forceUpdate();
	// },
	componentDidMount: function(){ 
      google.maps.event.addDomListener(window, 'load', this.initialize());  

    },
    initialize: function() {

		console.log(this.props.suggestions);
		console.log('lat:'+ this.props.suggestions.models[0].attributes.lat);
		console.log('long:'+ this.props.suggestions.models[0].attributes.lng);

		var myLatlng = new google.maps.LatLng(this.props.suggestions.models[0].attributes.lat,this.props.suggestions.models[0].attributes.lng);

		console.log(myLatlng);

		var mapOptions = {
          center: myLatlng,
          zoom: 15
        };

        var map = new google.maps.Map(document.querySelector(".map-canvas"),
            mapOptions);

        var marker = new google.maps.Marker({
		    position: myLatlng,
		    map: map,
		    title: 'Hello World!'
		});

	    var center;
		
		function calculateCenter() {
		  center = map.getCenter();
		}
		google.maps.event.addDomListener(map, 'idle', function() {
		  calculateCenter();
		});
		google.maps.event.addDomListener(window, 'resize', function() {
		    map.setCenter(center);
		});

	},

	render: function() {
		console.log('render function');
		
		return (
			<div className="infoDiv">
				<div className="infoName">{this.props.suggestions.models[0].attributes.name}</div>
				<div className="infoAdd">{this.props.suggestions.models[0].attributes.address}</div>
				<div className="map-canvas"></div>
			</div>
		)
		google.maps.event.addDomListener(window, 'load', this.initialize());
	}
});