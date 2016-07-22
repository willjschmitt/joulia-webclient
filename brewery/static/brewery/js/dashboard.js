define(['angularAMD','underscore','jquery','moment',
           "prettify","perfect-scrollbar","icheck","bootstrap-select",
           "datatables.net","jquery_fullscreen",
           "moment",
           "nvd3",
           
           "bemat-common",
           
           "jquery-ui","bootstrap","modernizr",
           
           'brewery-api',
    ],function(app,_,$,moment){
	app
	.controller('dashboardController',['$scope','breweryApi',function($scope,breweryApi){
		$scope.brewerys = breweryApi.brewery.query(initializeBrewerys);
		
		function initializeBrewerys(){
			$scope.brewhouses = {};
			_.each($scope.brewerys,function(brewery){
				$scope.brewhouses[brewery] = breweryApi.brewhouse.query({brewery:brewery.id});
			});
		}
		
	}]);
});