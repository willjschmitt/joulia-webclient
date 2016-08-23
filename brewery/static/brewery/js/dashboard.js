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
	.controller('dashboardController',['$scope','breweryApi','$uibModal',function($scope,breweryApi,$uibModal){
		$scope.brewerys = breweryApi.brewery.query(initializeBrewerys);
		
		function initializeBrewerys(){
			$scope.brewhouses = {};
			_.each($scope.brewerys,function(brewery){
				$scope.brewhouses[brewery.id] = breweryApi.brewhouse.query({brewery:brewery.id});
			});
		}
		
		$scope.showBrewhouseTokens = {}; //empty dict for which brewhouses to show the keys for
		$scope.toggleShowBrewhouseToken = function(brewhouseId){
			if (!$scope.showBrewhouseTokens.hasOwnProperty(brewhouseId))
				$scope.showBrewhouseTokens[brewhouseId] = true;
			else
				$scope.showBrewhouseTokens[brewhouseId] = !$scope.showBrewhouseTokens[brewhouseId];
		};
		
		$scope.addBrewery = function(){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'static/brewery/html/add-brewery-modal.html',
				controller: 'addBreweryModalCtrl'
			});

			modalInstance.result.then(function (result) {
				$scope.brewerys = breweryApi.brewery.query(initializeBrewerys);
			});
		};
		
		$scope.addBrewhouse = function(brewery){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'static/brewery/html/add-brewhouse-modal.html',
				controller: 'addBrewhouseModalCtrl',
				resolve:{
					brewery: function(){return brewery;}
				}
			});
	
			modalInstance.result.then(function (result) {
				$scope.brewerys = breweryApi.brewery.query(initializeBrewerys);
			});
		};
		
		//initializes all the tooltips dynamically loaded, etc
		window.bematadmin.App.init();
	}])
	.controller('addBreweryModalCtrl', function ($scope, $uibModalInstance,breweryApi) {		
		$scope.newBrewery = new breweryApi.brewery();
		
		$scope.brewingCompanys = new breweryApi.brewingCompany.query();
		
		$scope.ok = function () {
			$scope.newBrewery.$save(function(){
				$uibModalInstance.close(true);
			});
		};
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('addBrewhouseModalCtrl', function ($scope, $uibModalInstance,breweryApi,brewery) {
		$scope.brewery = brewery;
		
		$scope.newBrewhouse = new breweryApi.brewhouse({brewery:brewery.id});
		
		$scope.ok = function () {
			$scope.newBrewhouse.$save(function(){
				$uibModalInstance.close(true);
			});
		};
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});
});