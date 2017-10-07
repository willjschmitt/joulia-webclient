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
      controller = $controller('BrewhouseEquipmentController', {
        $scope: $rootScope.$new(),
      });
    })

    it('is defined', function() {
      expect(controller).toBeDefined();
    })
  });

});
