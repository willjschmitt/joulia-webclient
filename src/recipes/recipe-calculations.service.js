(function loadRecipeCalculationsService(_) {
  angular
    .module('app.common')
    .service('recipeCalculations', recipeCalculations);

  recipeCalculations.$inject = [];

  function recipeCalculations() {
    const self = this;

    self.originalGravity = originalGravity;

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
  }
}(window._));
