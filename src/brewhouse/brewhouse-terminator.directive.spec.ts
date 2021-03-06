/* eslint-disable */
import * as angular from 'angular';
import 'angular-mocks';

import './brewhouse-terminator.directive';

describe('app.brewhouse.terminator', function () {
  beforeEach(angular.mock.module('app.brewhouse.terminator'));

  var $rootScope, $compile, $interval, $httpBackend;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $interval = $injector.get('$interval');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('brewhouse-terminator directive', function () {
    var element, scope, isolatedScope;
    var endSessionPost;
    const html = `
        <brewhouse-terminator
            recipe-instance="recipeInstance">
        </brewhouse-terminator>`;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();

      endSessionPost = $httpBackend.when('POST', 'brewery/api/brewhouse/end/')
          .respond();
    });

    describe('endSession', function () {
      it('creates a modal instance', function () {
        const modalInstance = isolatedScope.endSession();
        expect(modalInstance).toBeDefined();
      });

      it('calls endRecipeInstanceOnServer upon modal close', function () {
        const modalInstance = isolatedScope.endSession();
        scope.recipeInstance = 12;
        scope.$digest();
        $httpBackend.expectPOST('brewery/api/brewhouse/end/',
            {recipe_instance: 12})
        modalInstance.close();
        $rootScope.$apply();
        $httpBackend.flush();
      });
    });

    describe('template binding', function () {
      describe('clicking next', function () {
        it ('should end the session', function () {
          // TODO(will): Improve this test to actually check for details being
          // clicked-through.
          scope.recipeInstance = 12;
          scope.$digest();
          element[0].querySelector('button').click();
        });
      });
    });
  });

});
