var React = require('react');

module.exports = React.createClass({
	initialize: function() {

		var mapEls = this.props.suggestion.map(function(suggestionModel) {
			var myLatlng = new google.maps.LatLng(30.252738,-97.723682);
			  var mapOptions = {
			    zoom: 15,
			    center: myLatlng
			  }
			  var map = new google.maps.Map(document.querySelector('map-canvas'), mapOptions);

			   google.maps.event.addListener(marker, 'click', function() {
			    infowindow.open(map,marker);
			  });
			}

			google.maps.event.addDomListener(window, 'load', initialize);
		});
		  
	},
	render: function() {
		return (
			<div className="map-canvas">

			</div>
		)
	}
});