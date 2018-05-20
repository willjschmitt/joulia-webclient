/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

import './recipe-calculations.service';

describe('app.recipes.recipe-calculations recipe-calculations.service', function () {
  beforeEach(angular.mock.module('app.recipes.recipe-calculations'));

  var $httpBackend;

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('recipeCalculations service', function () {
    var recipeCalculations;

    beforeEach(inject(function (_recipeCalculations_) {
      recipeCalculations = _recipeCalculations_;
    }));

    it('should be defined', function() {
      expect(recipeCalculations).toBeDefined();
    });

    describe('srmToRGBString', function () {
      it('calculates srm', function () {
        // tests are made of srm, rgb string pairs. Comments indicate the actual
        // rgb values, while the rgb string is the fitted values.
        const tests = [
          [ 1, 'rgb(255, 225, 149)'],  // 255, 230, 153
          [10, 'rgb(218, 117, 0)'],  // 251, 177, 35
          [20, 'rgb(160, 51, 0)'],  // 222, 124, 0
          [41, 'rgb(39, 0, 12)'],  // 149, 45, 0
          [61, 'rgb(0, 0, 32)'],  // 90, 10, 2
        ];

        tests.forEach(function checkTest(test) {
          expect(recipeCalculations.srmToRGBString(test[0])).toBe(test[1]);
        });
      });
    });
  });
});
