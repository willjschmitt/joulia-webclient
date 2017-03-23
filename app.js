define(['jquery','angularAMD','angular-route','angular-resource','angular-ui',
        "bemat-common",
    ],function($,angularAMD){
	var app = angular.module('joulia', ['ngRoute','ngResource','ui.bootstrap'])
		.config(['$locationProvider', '$routeProvider',function config($locationProvider, $routeProvider) {
			$locationProvider.hashPrefix('!');
			$routeProvider
				.when('/', angularAMD.route({
					templateUrl:'static/brewery/html/dashboard.html',
					controller:'dashboardController',
					controllerUrl:'dashboard'
				}))
				.when('/brewhouse/:brewhouseId', angularAMD.route({
					templateUrl:'static/brewery/html/brewhouse.html',
					controller:'brewhouseController',
					controllerUrl:'brewhouse'
				}))
				.when('/recipes/', angularAMD.route({
					templateUrl:'static/brewery/html/recipes.html',
					controller:'recipesController',
					controllerUrl:'recipes'
				}))
				.when('/recipe/:recipeId', angularAMD.route({
					templateUrl:'static/brewery/html/recipe.html',
					controller:'recipeController',
					controllerUrl:'recipe'
				}))
				.otherwise('/');
		}])
		.config(['$httpProvider', function($httpProvider){
	        // django and angular both support csrf tokens. This tells
	        // angular which cookie to add to what header.
	        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
	        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	    }])
	    .config(['$resourceProvider',function($resourceProvider) {
	    	$resourceProvider.defaults.stripTrailingSlashes = false;
		}]);
	return angularAMD.bootstrap(app);
});