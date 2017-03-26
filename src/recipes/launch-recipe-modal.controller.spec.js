/* eslint-disable */
describe('app.recipes launch-recipe-modal.controller', function () {
  beforeEach(module('app.recipes'));
  beforeEach(module('joulia.templates'));

  var $controller, $httpBackend, $rootScope, $location;

  beforeEach(inject(function ($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('LaunchRecipeModalController', function () {
    var controller;
    var brewhouseQuery;
    var $uibModalInstance;
    var brewhouse;

    beforeEach(function () {
      brewhouse = { id: 0 };
      brewhouseQuery = $httpBackend.when('GET', 'brewery/api/brewhouse')
        .respond([brewhouse]);

      $uibModalInstance = jasmine.createSpyObj(
        '$uibModalInstance', ['close', 'dismiss']);

      $httpBackend.expectGET('brewery/api/brewhouse');
      controller = $controller('LaunchRecipeModalController', {
        $uibModalInstance: $uibModalInstance
      });
      $httpBackend.flush();
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('ok', function () {
      it('should close modal', function () {
        controller.ok();
        expect($uibModalInstance.close).toHaveBeenCalled();
      });

      it('should close modal and send brewhouse', function () {
        controller.selectedBrewhouse = brewhouse;

        controller.ok();
        expect($uibModalInstance.close).toHaveBeenCalled();
        expect($uibModalInstance.close.calls.argsFor(0)).toEqual([{
          brewhouse: brewhouse,
        }]);
      });
    });

    describe('cancel', function () {
      it('should dismiss modal', function () {
        controller.cancel();
        expect($uibModalInstance.dismiss).toHaveBeenCalled();
      });
    });
  });
});