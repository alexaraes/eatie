var parseSettings = require('../../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
    defaults: {
        userId: '',
        restaurant: '',
        rating: '',
        userName: ''
    },
    parseClassName: 'Post',
    idAttribute: 'objectId'
});
