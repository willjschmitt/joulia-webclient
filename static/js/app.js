define(['jquery','angularAMD','angular-route','angular-resource',
        "bemat-common",
    ],function($,angularAMD){
	var app = angular.module('joulia', ['ngRoute','ngResource'])
		.config(['$locationProvider', '$routeProvider',function config($locationProvider, $routeProvider) {
			$locationProvider.hashPrefix('!');
			$routeProvider
				.when('/brewery/:breweryId', angularAMD.route({
					templateUrl:'static/html/brewery.html',
					controller:'breweryController as brewery',
					controllerUrl:'brewery'
				}))
				.otherwise('/');
		}])
		.config(['$httpProvider', function($httpProvider){
	        // django and angular both support csrf tokens. This tells
	        // angular which cookie to add to what header.
	        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
	        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	    }]);
	return angularAMD.bootstrap(app);
});