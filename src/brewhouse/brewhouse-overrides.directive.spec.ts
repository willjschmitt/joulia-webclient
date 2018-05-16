/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.brewhouse', function () {
  beforeEach(angular.mock.module('app.brewhouse'));
  beforeEach(angular.mock.module('joulia.templates'));

  // Mocks the backend for valueCard, which needs to make streaming calls to the
  // server.
  beforeEach(angular.mock.module(function($provide) {
    $provide.factory('TimeSeriesUpdater', function () {
      function TimeSeriesUpdater(recipeInstance, name, variableType) {
        this.latest = 0;
      }

      TimeSeriesUpdater.prototype.set = function(value, callback){
        this.latest = value
        if (callback) {
          callback();
        }
      }

      return TimeSeriesUpdater;
    });
  }));

  var $rootScope, $compile, $interval;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $interval = $injector.get('$interval');
  }));

  describe('brewhouse-overrides directive', function () {
    var element, scope, isolatedScope;
    const html = `
        <brewhouse-overrides
            recipe-instance="recipeInstance">
        </brewhouse-overrides>`;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    describe('template binding', function () {
      it ('should have toggleable elements', function () {
        // This test isn't perfect, but should be sufficient. This just checks
        // a few value cards exist.
        // TODO(will): Make tests look deeper to make sure child directives are
        // compiled and included.
        expect(element.html()).toContain('Heating Element Status');
        expect(element.html()).toContain('Pump Status');
      });
    });
  });

});