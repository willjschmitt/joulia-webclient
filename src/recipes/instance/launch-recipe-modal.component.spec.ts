/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

import './launch-recipe-modal.component';

describe('app.recipes.instance.launch-recipe-modal', function () {
  beforeEach(angular.mock.module('app.recipes.instance.launch-recipe-modal'));

  var $componentController, $httpBackend;

  beforeEach(inject(function ($injector) {
    $componentController = $injector.get('$componentController');
    $httpBackend = $injector.get('$httpBackend');
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
      brewhouse = { id: 11 };
      brewhouseQuery = $httpBackend.when('GET', 'brewery/api/brewhouse')
        .respond([brewhouse]);
      $httpBackend.expectGET('brewery/api/brewhouse');

      scope = {
        close: function () {},
        dismiss: function () {},
      };
      spyOn(scope, 'close');
      spyOn(scope, 'dismiss');
      controller = $componentController('launchRecipeModal', null, scope);

      $httpBackend.flush();
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('ok', function () {
      it('should close modal', function () {
        controller.ok();
        expect(scope.close).toHaveBeenCalled();
      });

      it('should close modal and send brewhouse', function () {
        controller.selectedBrewhouse = brewhouse;

        controller.ok();
        expect(scope.close).toHaveBeenCalled();
        expect(scope.close.calls.argsFor(0)).toEqual([{
          brewhouse: brewhouse,
        }]);
      });
    });

    describe('cancel', function () {
      it('should dismiss modal', function () {
        controller.cancel();
        expect(scope.dismiss).toHaveBeenCalled();
      });
    });
  });
});