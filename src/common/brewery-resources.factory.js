(function loadBreweryResourcesFactory() {
  angular
    .module('app.common')
    .factory('breweryResources', breweryResources);

  breweryResources.$inject = ['$resource'];

  function breweryResources($resource) {
    const brewingStepChoices = {
      MASH: { value: '0', name: 'Mash' },
      BOIL: { value: '1', name: 'Boil' },
      WHIRLPOOL: { value: '2', name: 'Whirlpool' },
      FERMENTATION: { value: '3', name: 'Fermentation' },
      CONDITIONING: { value: '4', name: 'Conditioning' },
    };

    const unitsChoices = {
      POUNDS: { value: '0', name: 'pounds' },
      OUNCES: { value: '1', name: 'ounces' },
      GRAMS: { value: '2', name: 'grams' },
      KILOGRAMS: { value: '3', name: 'kilograms' },
    };

    // Produces ratio of user units per gram.
    const unitsConversionFactors = {};
    unitsConversionFactors[unitsChoices.POUNDS.value] = 0.00220462;
    unitsConversionFactors[unitsChoices.OUNCES.value] = 0.035274;
    unitsConversionFactors[unitsChoices.GRAMS.value] = 1.0;
    unitsConversionFactors[unitsChoices.KILOGRAMS.value] = 0.001;

    return {
      Recipe: $resource('brewery/api/recipe/:id/', { id: '@id' },
          { update: { method: 'PUT' } }),
      MashPoint: $resource('brewery/api/mash_point/:id/', { id: '@id' },
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
      MaltIngredient: $resource('brewery/api/malt_ingredient/:id/',
          { id: '@id' }, { update: { method: 'PUT' } }),
      MaltIngredientSearch: $resource('brewery/api/malt_ingredient/'),
      BitteringIngredient: $resource('brewery/api/bittering_ingredient/:id/',
          { id: '@id' }, { update: { method: 'PUT' } }),
      BitteringIngredientSearch: $resource('brewery/api/bittering_ingredient/'),
      MaltIngredientAddition: $resource(
          'brewery/api/malt_ingredient_addition/:id/', { id: '@id' },
          { update: { method: 'PUT' } }),
      BitteringIngredientAddition: $resource(
          'brewery/api/bittering_ingredient_addition/:id/', { id: '@id' },
          { update: { method: 'PUT' } }),
      BrewingState: $resource('brewery/api/brewing_state/'),
      BREWING_STEP_CHOICES: brewingStepChoices,
      BREWING_STEP_CHOICES_ordered: [
        brewingStepChoices.MASH,
        brewingStepChoices.BOIL,
        brewingStepChoices.WHIRLPOOL,
        brewingStepChoices.FERMENTATION,
        brewingStepChoices.CONDITIONING,
      ],
      UNITS_CHOICES: unitsChoices,
      UNITS_CHOICES_ordered: [
        unitsChoices.POUNDS,
        unitsChoices.OUNCES,
        unitsChoices.GRAMS,
        unitsChoices.KILOGRAMS,
      ],
      UNITS_CHOICES_conversion_factors: unitsConversionFactors,
    };
  }
}());
