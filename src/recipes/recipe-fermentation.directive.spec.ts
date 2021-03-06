/* eslint-disable */
import * as angular from 'angular';
import 'angular-mocks';

import './recipe-fermentation.directive';
import '../common/brewery-resources.factory';

describe('app.recipes.recipe-fermentation', function () {
  beforeEach(angular.mock.module('app.recipes.recipe-fermentation'));
  beforeEach(angular.mock.module('app.common.brewery-resources'));

  var $compile, $httpBackend, $rootScope, breweryResources;

  beforeEach(inject(function ($injector) {
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    breweryResources = $injector.get('breweryResources');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('recipe-fermentation directive', function () {
    var element, scope, isolatedScope;
    var additionUpdate, additionDelete;
    const html = `
        <recipe-fermentation recipe="recipe">
        </recipe-fermentation>`;

    beforeEach(function () {
      $httpBackend
        .when('PUT', /brewery\/api\/recipe\/\d+/)
          .respond(function (method, url, data, headers, params) {
            return [200, data];
          });
    });

    beforeEach(function () {
      scope = $rootScope.$new();
      scope.recipe = new breweryResources.Recipe({ id: 5 });
      element = $compile(html)(scope);

      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    describe('updateRecipe', function() {
      it('calls update endpoint', function() {
        $httpBackend.expectPUT(/brewery\/api\/recipe\/\d+/);
        isolatedScope.updateRecipe();
        $httpBackend.flush();
      });
    });
  });
});
