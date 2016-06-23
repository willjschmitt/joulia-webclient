define(['jquery','angularAMD','angular-route','angular-resource',
    ],function($,angularAMD){
	var app = angular.module('joulia', ['ngRoute','ngResource'])
		.config(['$locationProvider', '$routeProvider',function config($locationProvider, $routeProvider) {
			$locationProvider.hashPrefix('!');
			$routeProvider
				.when('/brewery/:breweryId', angularAMD.route({
					templateUrl:'static/html/dashboard.html',
					controller:'dashboardController as dashboard',
					controllerUrl:'dashboard'
				}))
				.otherwise('/');
		}
	]);
	return angularAMD.bootstrap(app);
});