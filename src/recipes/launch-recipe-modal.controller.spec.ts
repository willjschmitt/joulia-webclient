/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

import './launch-recipe-modal.controller';

describe('app.recipes.launch-recipe-modal launch-recipe-modal.controller', function () {
  beforeEach(angular.mock.module('app.recipes.launch-recipe-modal'));

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
    var controller, scope;
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
      scope = $rootScope.$new();
      controller = $controller('LaunchRecipeModalController', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance
      });
      $httpBackend.flush();
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('ok', function () {
      it('should close modal', function () {
        scope.ok();
        expect($uibModalInstance.close).toHaveBeenCalled();
      });

      it('should close modal and send brewhouse', function () {
        scope.selectedBrewhouse = brewhouse;

        scope.ok();
        expect($uibModalInstance.close).toHaveBeenCalled();
        expect($uibModalInstance.close.calls.argsFor(0)).toEqual([{
          brewhouse: brewhouse,
        }]);
      });
    });

    describe('cancel', function () {
      it('should dismiss modal', function () {
        scope.cancel();
        expect($uibModalInstance.dismiss).toHaveBeenCalled();
      });
    });
  });
});