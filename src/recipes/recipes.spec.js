/* eslint-disable */
describe('app.recipes', function() {
  beforeEach(module('app.recipes'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('RecipesController', function() {
    var controller;

    beforeEach(function() {
      var $scope = {};
      controller = $controller('RecipesController', { $scope: $scope });
    })

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });
  });
});