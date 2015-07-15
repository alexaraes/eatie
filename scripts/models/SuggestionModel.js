var parseSettings = require('../../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
	defaults: {
		name: null,
		food: null,
		createdAt: null,
		address: null,
		category: null,
		lat: null,
		lng: null,
		photo: null,
		description: null
	},
	parseClassName: 'Restaurant',
    idAttribute: 'objectId'
});