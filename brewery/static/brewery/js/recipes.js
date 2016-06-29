define(['angularAMD','underscore','jquery','moment',
           "prettify","perfect-scrollbar","icheck","bootstrap-select",
           "datatables.net","jquery_fullscreen",
           "moment",
           "nvd3",
           
           "snackbar","toasts",
           
           "bemat-common",
           
           "jquery-ui","bootstrap","modernizr",
           
           'timeseries',"toggleable-element",'value-card','dial',
           
           "brewery-api",
    ],function(app,_,$,moment){
	app
	.controller('recipesController',['$scope','breweryApi','$uibModal',function($scope,breweryApi,$uibModal){		
		$scope.recipes = breweryApi.recipe.query();
		
		$scope.launch_recipe = function(recipe){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'static/brewery/html/launch-recipe-modal.html',
				controller: 'LaunchRecipeModalCtrl',
//				resolve: {
//					items: function () {return $scope.items;}
//				}
			});

			modalInstance.result.then(function (result) {
			});
		}
		
		$scope.recipe_properties = [
		    {header:'Style',name:'style'},
		    {header:'Number of Batches',name:'number_of_batches'},
		    {header:'Last Brewed',name:'last_brewed'}
		];
	}])
	.controller('LaunchRecipeModalCtrl', ['$scope','$uibModalInstance','breweryApi',function ($scope, $uibModalInstance,breweryApi) {

		$scope.brewerys = breweryApi.brewery.query();
		$scope.selectedBrewery = null;
		
		$scope.ok = function () {
			$uibModalInstance.close(true);
		};
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}]);
});