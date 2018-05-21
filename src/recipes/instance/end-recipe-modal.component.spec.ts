/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

import './end-recipe-modal.component';

describe('app.recipes.end-recipe-modal', function () {
  beforeEach(angular.mock.module('app.recipes.instance.end-recipe-modal'));

  var $componentController, $httpBackend;

  beforeEach(inject(function ($injector) {
    $componentController = $injector.get('$componentController');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('endRecipeModal', function () {
    var controller, scope;

    beforeEach(function () {
      scope = {
        close: function () {},
        dismiss: function () {},
      };
      spyOn(scope, 'close');
      spyOn(scope, 'dismiss');
      controller = $componentController('endRecipeModal', null, scope);
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('ok', function () {
      it('should close modal', function () {
        controller.ok();
        expect(scope.close).toHaveBeenCalled();
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