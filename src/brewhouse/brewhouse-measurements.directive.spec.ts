/* eslint-disable */
import * as angular from 'angular';
import 'angular-mocks';

import './brewhouse-measurements.directive';
import '../common/brewery-resources.factory';

describe('app.brewhouse.measurements', function () {
  beforeEach(angular.mock.module('app.brewhouse.measurements'));
  beforeEach(angular.mock.module('app.common.brewery-resources'));

  var $rootScope, $compile, $interval, $httpBackend, breweryResources;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $interval = $injector.get('$interval');
    $httpBackend = $injector.get('$httpBackend');
    breweryResources = $injector.get('breweryResources');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('brewhouse-measurements directive', function () {
    var element, scope, isolatedScope;
    const html = `
        <div
            brewhouse-measurements
            recipe-instance="recipeInstance">
        </div>`;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.recipeInstance = {};
      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    describe('measurementChange', function() {
      it('saves recipeInstance', function () {
        scope.recipeInstance = new breweryResources.RecipeInstance({ id: 11 });
        scope.$digest();
        $httpBackend.expectPUT('brewery/api/recipeInstance/11')
            .respond();
        isolatedScope.measurementChange();
        $httpBackend.flush();
      });
    });
  });

});
