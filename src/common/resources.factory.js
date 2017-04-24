(function loadResourcesFactory() {
  angular
    .module('app.common')
    .factory('breweryResources', breweryResources);

  breweryResources.$inject = ['$resource'];

  function breweryResources($resource) {
    return {
      Recipe: $resource('brewery/api/recipe/:id/', { id: '@id' },
          { update: { method: 'PUT' } }),
      RecipeInstance: $resource('brewery/api/recipeInstance/:id/', { id: '@id' },
          { update: { method: 'PUT' } }),
      Brewhouse: $resource('brewery/api/brewhouse/:id/', { id: '@id' },
          { update: { method: 'PUT' } }),
      Brewery: $resource('brewery/api/brewery/:id/', { id: '@id' },
          { update: { method: 'PUT' } }),
      BrewingCompany: $resource('brewery/api/brewingCompany/:id/', { id: '@id' },
          { update: { method: 'PUT' } }),
      BeerStyle: $resource('brewery/api/beerStyle/:id/', { id: '@id' },
          { update: { method: 'PUT' } }),
      TimeSeriesDataPoint: $resource('/live/timeseries/new/', {}),
    };
  }
}());
