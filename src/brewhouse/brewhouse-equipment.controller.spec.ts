/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

import './brewhouse-equipment.controller';

describe('app.brewhouse.equipment', function () {
  beforeEach(angular.mock.module('app.brewhouse.equipment'));

  var $rootScope, $controller;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
  }));

  describe('BrewhouseEquipmentController', function () {
    var controller;

    beforeEach(function() {
      const scope = $rootScope.$new();
      scope.recipeInstance = { id: 10 };
      scope.brewhouse = { software_version: 11 };
      controller = $controller('BrewhouseEquipmentController', {
        $scope: scope,
      });
    })

    it('is defined', function() {
      expect(controller).toBeDefined();
    })
  });

});
