var parseSettings = require('../../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
    defaults: {
        username: null,
        password: null,
        email: null,
        firstName: null,
        createdAt: null,
        loggedIn: false
    },
    parseClassName: '_User',
    idAttribute: 'objectId',
    isUser: true
});