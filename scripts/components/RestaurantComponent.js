var React = require('react');

module.exports = React.createClass({
	render: function() {
		var that = this;

		function initialize() {
	        var mapOptions = {
	          center: { lat: -34.397, lng: 150.644},
	          zoom: 8
        };
        var map = new google.maps.Map(document.querySelector('.mapCanvas'),
            mapOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);

		return (
			<div className="mapCanvas" ref="mapCanvas"></div>
		)
	}
});