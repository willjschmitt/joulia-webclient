/* eslint-disable */
import * as angular from 'angular';
import 'angular-mocks';

import './brewhouse-inactive.directive';

describe('app.brewhouse.inactive', function () {
  beforeEach(angular.mock.module('app.brewhouse.inactive'));

  var $rootScope, $compile, $interval, $httpBackend;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $interval = $injector.get('$interval');
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('brewhouse-terminator directive', function () {
    var element, scope, isolatedScope;
    var recipeInstanceQuery, recipeQuery;
    const html = `
      <brewhouse-inactive
          brewhouse="brewhouse">
      </brewhouse-inactive>`;

    beforeEach(function () {
      recipeInstanceQuery = $httpBackend.whenGET(
          /brewery\/api\/recipeInstance\?brewhouse=5.*/)
        .respond([]);

      recipeQuery = $httpBackend.whenGET('brewery/api/recipe')
        .respond([]);
    });

    beforeEach(function () {
      scope = $rootScope.$new();
      scope.brewhouse = {
        id: 5,
      };

      $httpBackend.expectGET(/brewery\/api\/recipeInstance\?brewhouse=5.*/);
      $httpBackend.expectGET('brewery/api/recipe');

      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    it('exists with proper text', function () {
      expect(element.html()).toContain('Brewhouse not active');
      expect(element.html()).toContain(
        'Brewhouse is not active. Visit the recipes page to launch a recipe.');
    });
  });

});
