var parseSettings = require('../../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
    defaults: {
        image: '',
        objectId: '',
        caption: '',
        createdAt: ''
    },
    parseClassName: 'Post',
    idAttribute: 'objectId'
});
