var Backbone = require('backbone');
var PostModel = require('../models/PostModel');

module.exports = Backbone.Collection.extend({
    model: PostModel,
    parseClassName: 'Post'
});