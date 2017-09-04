(function loadRecipeCalculationsService(_) {
  angular
    .module('app.common')
    .service('recipeCalculations', recipeCalculations);

  recipeCalculations.$inject = [];

  function recipeCalculations() {
    const self = this;

    self.originalGravity = originalGravity;
    self.srmToRGBString = srmToRGBString;

    function originalGravity(maltIngredientAdditions, volume) {
      const gravityGallons = _.reduce(maltIngredientAdditions,
        function addGravity(memo, iter) {
          const poundsToGrams = 0.00220462;
          const amountPounds = iter.amount * poundsToGrams;
          gravity = iter.ingredient.potential_sg_contribution * amountPounds;
          return memo + gravity;
        }, 0.0);
      return gravityGallons / volume;
    }

    function limit0To255(value) {
      return Math.round(Math.max(Math.min(value, 255), 0));
    }

    /**
     * Converts SRM in to a css RGB color string.
     * Is a rough approximation for color, and shouldn't be depended on.
     */
    function srmToRGBString(srm) {
      const red = limit0To255(275.0 - (5.75 * srm));
      const green = limit0To255(275.0 - (50.0 * Math.pow(srm, 0.5)));
      const blue = limit0To255(Math.max(180.0 - (31.0 * srm), -29.0 + srm));
      return `rgb(${red}, ${green}, ${blue})`;
    }
  }
}(window._));
