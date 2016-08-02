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
		
		$scope.showBrewhouseKeys = {}; //empty dict for which brewhouses to show the keys for
		$scope.toggleShowBrewhouseKey = function(brewhouseId){
			if (!$scope.showBrewhouseKeys.hasOwnProperty(brewhouseId))
				$scope.showBrewhouseKeys[brewhouseId] = true;
			else
				$scope.showBrewhouseKeys[brewhouseId] = !$scope.showBrewhouseKeys[brewhouseId];
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
		
		//initializes all the tooltips dynamically loaded, etc
		window.bematadmin.App.init();
	}])
	.controller('addBreweryModalCtrl', ['$scope','$uibModalInstance','breweryApi',function ($scope, $uibModalInstance,breweryApi) {		
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
	}]);;
});