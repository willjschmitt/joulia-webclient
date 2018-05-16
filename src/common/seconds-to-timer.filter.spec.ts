/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.common', function () {
  beforeEach(angular.mock.module('app.common'));

  var $rootScope, $compile;

  describe('secondsToTimer filter', function () {
    var secondsToTimerFilter;

    beforeEach(inject(function(_secondsToTimerFilter_) {
      secondsToTimerFilter = _secondsToTimerFilter_;
    }))

    it('shows time less than 10seconds', function () {
      const want = '00:09';
      const got = secondsToTimerFilter(9.0);
      expect(got).toBe(want);
    });

    it('shows time more than 10seconds but less than 1minute', function () {
      const want = '00:30';
      const got = secondsToTimerFilter(30.0);
      expect(got).toBe(want);
    });

    it('shows time less than 10minute but greater than 1minute', function () {
      const want = '01:30';
      const got = secondsToTimerFilter(90.0);
      expect(got).toBe(want);
    });

    it('shows time greater than 10minutes but less than 1hour', function () {
      const want = '10:30';
      const got = secondsToTimerFilter(630.0);
      expect(got).toBe(want);
    });

    it('shows time greater than 1hour but less than 10 hours', function () {
      const want = '01:00:00';
      const got = secondsToTimerFilter(3600.0);
      expect(got).toBe(want);
    });

    it('shows time greater than 10hours', function () {
      const want = '10:00:00';
      const got = secondsToTimerFilter(36000.0);
      expect(got).toBe(want);
    });
  });
});