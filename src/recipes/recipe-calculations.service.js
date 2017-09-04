(function loadRecipeCalculationsService() {
  angular
    .module('app.common')
    .service('recipeCalculations', recipeCalculations);

  recipeCalculations.$inject = [];

  function recipeCalculations() {
    const self = this;

    self.srmToRGBString = srmToRGBString;

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
}());
