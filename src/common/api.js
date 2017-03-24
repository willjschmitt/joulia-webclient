define(['app','angular-resource'], function (app) {
	app.
    factory('breweryApi', function($resource){
        return {
            recipe: $resource('brewery/api/recipe/:id', {id:'@id'}, {update:{method:'PUT'}}),
            recipeInstance: $resource('brewery/api/recipeInstance/:id', {id:'@id'}, {update:{method:'PUT'}}),
            brewhouse: $resource('brewery/api/brewhouse/:id', {id:'@id'}, {update:{method:'PUT'}}),
            brewery: $resource('brewery/api/brewery/:id', {id:'@id'}, {update:{method:'PUT'}}),
            brewingCompany: $resource('brewery/api/brewingCompany/:id', {id:'@id'}, {update:{method:'PUT'}}),
            beerStyle: $resource('brewery/api/beerStyle/:id', {id:'@id'}, {update:{method:'PUT'}}),
            timeSeriesDataPoint: $resource('/live/timeseries/new/', {}),
        };
    });
});