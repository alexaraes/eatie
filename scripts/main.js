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
var postList = (<ProfilePage myApp={myApp} suggestions={suggestions} user={user} posts={posts} />);

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
			React.render(postList, containerEl);
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

function fetchMap(name) {
	var q = {};

	if(name) {
		q = name;
	}

	suggestions.fetch({
		query: q,
		success: function() {
			React.render(<RestaurantPage suggestions={suggestions} user={user} myApp={myApp} /> , containerEl);
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
		'restaurant/:restaurant': 'restaurant',
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
	profile: function(userId) {
		fetchPosts(userId);
		React.render(
			<ProfilePage myApp={myApp} userId={userId} suggestions={suggestions} user={user} posts={posts} />, containerEl
		);
	},
	feed: function() {
		fetchPosts();
		React.render(
			<ActivityFeed posts={posts} user={user} myApp={myApp} />,
			containerEl
		)
	},
	restaurant: function(name) {
		fetchMap(name);
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