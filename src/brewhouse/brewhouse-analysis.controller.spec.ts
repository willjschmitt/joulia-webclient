/* eslint-disable */
import * as angular from 'angular';
import 'angular-mocks';

import './brewhouse-analysis.controller';

describe('app.brewhouse.analysis', function () {
  beforeEach(angular.mock.module('app.brewhouse.analysis'));

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
