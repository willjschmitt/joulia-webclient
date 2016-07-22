define(['app','angular-resource'], function (app) {
	app.
    factory('breweryApi', function($resource){
        return {
            recipe: $resource('brewery/api/recipe/:id', {id:'@id'}, {update:{method:'PUT'}}),
            recipeInstance: $resource('brewery/api/recipeInstance/:id', {id:'@id'}, {update:{method:'PUT'}}),
            brewery: $resource('brewery/api/brewery/:id', {id:'@id'}, {update:{method:'PUT'}}),
            brewingFacility: $resource('brewery/api/brewingFacility/:id', {id:'@id'}, {update:{method:'PUT'}}),
            beerStyle: $resource('brewery/api/beerStyle/:id', {id:'@id'}, {update:{method:'PUT'}}),
        };
    });
});