/* eslint-disable */
import angular = require('angular');

import './recipe.controller';
import '../common/brewery-resources.factory';

describe('app.recipes recipe.controller', function () {
  beforeEach(angular.mock.module('app.recipes.recipe-controller'));
  beforeEach(angular.mock.module('app.common.brewery-resources'));

  var $controller, $httpBackend, $rootScope, $location, breweryResources;

  beforeEach(inject(function ($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    breweryResources = $injector.get('breweryResources');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('RecipeController', function () {
    var controller, scope;
    var recipeGet;
    var beerStyleQuery;
    var mashPointQuery;

    beforeEach(function () {
      recipeGet = $httpBackend.when('GET', 'brewery/api/recipe/12')
        .respond({ id: 12 });

      $httpBackend.expectGET('brewery/api/recipe/12');
    });

    // Define responses for queries for foreign items attached to the recipe.
    beforeEach(function () {
      mashPointQuery = $httpBackend.whenGET(
          /brewery\/api\/mash_point\?recipe=\d+/).respond([]);

      $httpBackend.expectGET(/brewery\/api\/mash_point\?recipe=\d+/);
    });

    var recipeUpdate;
    var mashPointSave;

    beforeEach(function () {
      recipeUpdate = $httpBackend.when('PUT', 'brewery/api/recipe/12')
        .respond(function (method, url, data, headers, params) {
          return [201, data];
        });

      mashPointSave = $httpBackend
        .when('POST', 'brewery/api/mash_point')
          .respond(function (method, url, data, headers, params) {
            const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            return [201, angular.extend({ id: id }, data)];
          });

      scope = $rootScope.$new();
      controller = $controller('RecipeController', {
        $scope: scope,
        $stateParams: { recipeId: 12 },
      });
      $httpBackend.flush();
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('save', function () {
      it('should update existing recipe on server and close modal', function () {
        $httpBackend.expectPUT('brewery/api/recipe/12');
        scope.save();
        $httpBackend.flush();
      });
    });
  });
});
