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
	.controller('recipesController',['$scope','breweryApi',function($scope,breweryApi){		
		$scope.recipes = breweryApi.recipe.query(function(){console.log($scope.recipes);});
		
		$scope.recipe_properties = [
		    {header:'Style',name:'style'},
		    {header:'Number of Batches',name:'number_of_batches'},
		    {header:'Last Brewed',name:'last_brewed'}
		];
	}]);
});