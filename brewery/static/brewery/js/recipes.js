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
	.controller('recipesController',['$scope','breweryApi','$uibModal','$http',function($scope,breweryApi,$uibModal,$http){		
		$scope.recipes = breweryApi.recipe.query();
		
		$scope.launch_recipe = function(recipe){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'static/brewery/html/launch-recipe-modal.html',
				controller: 'LaunchRecipeModalCtrl'
			});

			modalInstance.result.then(function (result) {
				console.log(recipe);
				var data = {
					recipe:recipe.id,
					brewery:result.brewery.id
				};
				console.log(data);
				$http({
					method: 'POST',
					url: '/brewery/launch',
					data:data
				}).then(function(response) {
					
				});
			});
		};
		
		$scope.addRecipe = function(){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'static/brewery/html/add-recipe-modal.html',
				controller: 'addRecipeModalCtrl'
			});

			modalInstance.result.then(function (result) {
				$scope.recipes = breweryApi.recipe.query();
			});
		}
		
		$scope.recipe_properties = [
		    //{header:'Style',name:'style'}, // moved to be explicitly styled
		    {header:'Number of Batches',name:'number_of_batches'},
		    {header:'Last Brewed',name:'last_brewed'}
		];
	}])
	.controller('LaunchRecipeModalCtrl', ['$scope','$uibModalInstance','breweryApi',function ($scope, $uibModalInstance,breweryApi) {

		$scope.brewerys = breweryApi.brewery.query();
		$scope.selectedBrewery = null;
		
		$scope.ok = function () {
			$uibModalInstance.close({brewery:$scope.selectedBrewery});
		};
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}])
	.controller('addRecipeModalCtrl', ['$scope','$uibModalInstance','breweryApi',function ($scope, $uibModalInstance,breweryApi) {		
		$scope.newRecipe = new breweryApi.recipe();
		
		$scope.beerStyles = breweryApi.beerStyle.query();
		
		$scope.ok = function () {
			$scope.newRecipe.$save(function(){
				$uibModalInstance.close(true);
			});
		};
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}]);
});