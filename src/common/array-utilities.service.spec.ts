/* eslint-disable */
import * as angular from 'angular';
import 'angular-mocks';

import './array-utilities.service';

describe('app.common.array-utilties array-utilities.service', function () {
  beforeEach(angular.mock.module('app.common.array-utilities'));

  var $rootScope;

  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
  }));

  describe('arrayUtilities service', function () {
    var arrayUtilities;

    beforeEach(inject(function (_arrayUtilities_) {
      arrayUtilities = _arrayUtilities_;
    }));

    it('should be defined', function() {
      expect(arrayUtilities).toBeDefined();
    });

    describe('minimumInArrays', function () {
      it('calculates minimum in standard array', function () {
        var arrays = [
          { values: [[0.0, 1], [0.1, 2], [0.2, 3]] },
          { values: [[0.0, 4], [0.1, 5], [0.2, 6]] },
        ];

        expect(arrayUtilities.minimumInArrays(arrays)).toBe(1);
      });

      it('calculates minimum in empty arrays', function () {
        var arrays = [
          { values: [] },
          { values: [] },
        ];

        expect(arrayUtilities.minimumInArrays(arrays)).toBe(+Infinity);
      });
    });

    describe('maximumInArrays', function () {
      it('calculates maximum in standard array', function () {
        var arrays = [
          { values: [[0.0, 1], [0.1, 2], [0.2, 3]] },
          { values: [[0.0, 4], [0.1, 5], [0.2, 6]] },
        ];

        expect(arrayUtilities.maximumInArrays(arrays)).toBe(6);
      });

      it('calculates maximum in empty arrays', function () {
        var arrays = [
          { values: [] },
          { values: [] },
        ];

        expect(arrayUtilities.maximumInArrays(arrays)).toBe(-Infinity);
      });
    });

    describe('minMaxWithSpread', function () {
      it('add spread equally', function () {
        const min = 5.0;
        const max = 5.0;
        const spread = 10.0;
        expect(arrayUtilities.minMaxWithSpread(min, max, spread)).toEqual({
          min: 0.0,
          max: 10.0,
        });
      });

      it('adds no spread', function () {
        const min = -5.0;
        const max = 15.0;
        const spread = 10.0;
        expect(arrayUtilities.minMaxWithSpread(min, max, spread)).toEqual({
          min: -5.0,
          max: 15.0,
        });
      });

      it('corrects direction', function () {
        const min = 10.0;
        const max = 0.0;
        const spread = 10.0;
        expect(arrayUtilities.minMaxWithSpread(min, max, spread)).toEqual({
          min: 0.0,
          max: 10.0,
        });
      });

      it('corrects direction with inifinity', function () {
        const min = +Infinity;
        const max = -Infinity;
        const spread = 10.0;
        expect(arrayUtilities.minMaxWithSpread(min, max, spread)).toEqual({
          min: -5.0,
          max: +5.0,
        });
      });
    })
  });
});
