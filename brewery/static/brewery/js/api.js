define(['app','angular-resource'], function (app) {
	app.
    factory('breweryApi', function($resource){
        return {
            recipe: $resource('brewery/api/recipe/:id', {id:'@id'}, {update:{method:'PUT'}}),
        };
    });
});