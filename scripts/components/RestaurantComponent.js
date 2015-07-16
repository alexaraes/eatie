var React = require('react');

module.exports = React.createClass({
	render: function() {
		
		function initialize() {
			var myLatlng = new google.maps.LatLng(30.252738,-97.723682);
			var mapOptions = {
				zoom: 15,
				center: myLatlng
			}
			var map = new google.maps.Map(document.querySelector('map-canvas'), mapOptions);

			var contentString = '<div id="content">'+
			    '<div id="siteNotice">'+
			    '</div>'+
			    '<h3 id="firstHeading" class="firstHeading">Launderette</h3>'+
			    '</div>';

			var infowindow = new google.maps.InfoWindow({
			    content: contentString
			});

			var marker = new google.maps.Marker({
			    position: myLatlng,
			    map: map,
			    title: 'Launderette'
			});
				google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			  	});
			}

			google.maps.event.addDomListener(window, 'load', initialize);
	}
});