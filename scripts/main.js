var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

var UserModel = require('./models/UserModel.js');
var SuggestionCollection = require('./collections/SuggestionCollection.js');
var PostCollection = require('./collections/PostCollection.js');
var SuggestionModel = require('./models/SuggestionModel.js');
var PostModel = require('./models/PostModel.js');

var HomePage = require('./components/HomeComponent.js');
var NavBar = require('./components/NavbarComponent.js');
var LoginPage = require('./components/LoginComponent.js');
var SignUpPage = require('./components/SignupComponent.js');
var AdminPage = require('./components/AdminComponent.js');
var ActivityFeed = require('./components/ActivityFeedComponent.js');
var ProfilePage = require('./components/ProfileComponent.js');
var RestaurantPage = require('./components/RestaurantInfoComponent.js');
var CategoryPage = require('./components/CategoryComponent.js');

var user = new UserModel();
var suggestions = new SuggestionCollection();
var posts = new PostCollection();

var suggList = (<HomePage myApp={myApp} suggestions={suggestions} user={user} />);
var mapPage = (<RestaurantPage suggestions={suggestions} user={user} myApp={myApp} />);
var containerEl = document.getElementById('container');

React.render(
	<NavBar user={user} myApp={myApp} />,
	document.getElementById('nav')
);


function fetchPosts(userId) {
	var q = {};

	if(userId) {
		q.userId = userId;
	}

	posts.fetch({

		query: q,
		success: function() {
			suggestions.fetch({
				success: function() {
					React.render(
						<ProfilePage myApp={myApp} suggestions={suggestions} user={user} posts={posts} />, 
						containerEl
					);
				}
			});
			
		}
	});
}

function fetchSuggestions(category) {
	var q = {};

	if(category) {
		q.category = category;
	}

	suggestions.fetch({
		query: q,
		success: function() {
			React.render(suggList, containerEl);
		}
	});
}

function fetchMap(objectId) {
	var q = {};

	if(objectId) {
		q.objectId = objectId;
	}

	console.log('fukc this shit');

	suggestions.fetch({
		query: q,
		success: function() {
			console.log(q);
			console.log('ffffffuck');
			React.render(mapPage , containerEl);
		}
	});
}

var App = Backbone.Router.extend({
	routes: {
		'': 'home',
		'home': 'home',
		'signup': 'signup',
		'login': 'login',
		'profile/:userId': 'profile',
		'feed': 'feed',
		'info/:id': 'info',
		'category/:category': 'category',
		'admin': 'admin'
	},
	home: function() {
		fetchSuggestions();
	},
	signup: function() {
		React.render(
			<SignUpPage user={user} myApp={myApp} />,
			containerEl
		);
	},
	login: function() {
		React.render(
			<LoginPage user={user} myApp={myApp} />,
			containerEl
		);
	},
	profile: function() {
		fetchPosts();
	},
	feed: function() {
		React.render(
			<ActivityFeed user={user} posts={posts} suggestions={suggestions} myApp={myApp} />,
			containerEl
		);
	},
	info: function(objectId) {
		fetchMap(objectId);
	},
	category: function(category) {
		fetchSuggestions(category);
	},
	admin: function() {
		React.render(
			<AdminPage suggestions={suggestions} myApp={myApp} />,
			containerEl
		);
	}
});

var myApp = new App();
Backbone.history.start();

console.log('application running');

user.me();