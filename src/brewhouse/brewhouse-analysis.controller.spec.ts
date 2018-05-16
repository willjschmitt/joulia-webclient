/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.brewhouse', function () {
  beforeEach(angular.mock.module('app.brewhouse'));
  beforeEach(angular.mock.module('joulia.templates'));

  var $rootScope, $controller;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
  }));

  describe('BrewhouseAnalysisController', function () {
    var controller;

    beforeEach(function() {
      controller = $controller('BrewhouseAnalysisController', {
        $scope: $rootScope.$new(),
      });
    })

    it('is defined', function() {
      expect(controller).toBeDefined();
    })
  });

});
