/* eslint-disable */
describe('app.brewhouse', function () {
  beforeEach(module('app.brewhouse'));
  beforeEach(module('joulia.templates'));

  var $rootScope, $controller;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
  }));

  describe('BrewhouseEquipmentController', function () {
    var controller;

    beforeEach(function() {
      const scope = $rootScope.$new();
      scope.recipeInstance = { id: 10 };
      scope.brewhouse = { software_version: 11 };
      controller = $controller('BrewhouseEquipmentController', {
        $scope: scope,
      });
    })

    it('is defined', function() {
      expect(controller).toBeDefined();
    })
  });

});
