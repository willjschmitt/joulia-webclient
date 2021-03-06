/* eslint-disable */
import * as angular from 'angular';
import 'angular-mocks';

import './end-recipe-modal.controller';

describe('app.recipes.end-recipe-modal end-recipe-modal.controller', function () {
  beforeEach(angular.mock.module('app.recipes.end-recipe-modal'));

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

  describe('EndRecipeModalController', function () {
    var controller, scope;
    var beerStyleQuery;
    var $uibModalInstance;

    beforeEach(function () {
      $uibModalInstance = jasmine.createSpyObj(
        '$uibModalInstance', ['close', 'dismiss']);

      scope = $rootScope.$new();
      controller = $controller('EndRecipeModalController', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance
      });
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('ok', function () {
      it('should close modal', function () {
        scope.ok();
        expect($uibModalInstance.close).toHaveBeenCalled();
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
