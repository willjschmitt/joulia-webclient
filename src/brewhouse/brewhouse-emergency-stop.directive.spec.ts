/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.brewhouse', function () {
  beforeEach(angular.mock.module('app.brewhouse'));
  beforeEach(angular.mock.module('joulia.templates'));

  var $rootScope, $compile, $interval, $httpBackend;

  beforeEach(angular.mock.module(function($provide) {
    $provide.value('TimeSeriesUpdater', function () {
      const self = this;
      self.latest = null;
      self.set = function(value, callback) {
        self.latest = value;
        if (!!callback) {
          callback();
        }
      }
      return self;
    });
  }));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $interval = $injector.get('$interval');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('brewhouse-emergency-stop directive', function () {
    var element, scope, isolatedScope;
    var endSessionPost;
    const html = `
        <brewhouse-emergency-stop
            recipe-instance="recipeInstance">
        </brewhouse-emergency-stop>`;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    describe('template', function () {
      describe('clicking button', function () {
        it ('should toggle emergency stop from off to on', function () {
          isolatedScope.emergencyStopStatus.latest = false;
          element[0].querySelector('button').click();
          expect(isolatedScope.emergencyStopStatus.latest).toBeTruthy();
        });

        it ('should toggle emergency stop from on to off', function () {
          isolatedScope.emergencyStopStatus.latest = true;
          element[0].querySelector('button').click();
          expect(isolatedScope.emergencyStopStatus.latest).toBeFalsy();
        });
      });

      describe('button text', function() {
        it('should show "Emergency Stop" when inactive', function () {
          isolatedScope.emergencyStopStatus.latest = false;
          scope.$digest();
          expect(element.html()).toContain('Emergency Stop');
        });

        it('should show "Release E-Stop" when active', function () {
          isolatedScope.emergencyStopStatus.latest = true;
          scope.$digest();
          expect(element.html()).toContain('Release E-Stop');
        });
      });

      // TODO(willjschmitt): Add tests for classes.
    });

    describe('toggleEmergencyStop', function () {
      it('should toggle emergencyt stop from off to on', function () {
        isolatedScope.emergencyStopStatus.latest = false;
        isolatedScope.toggleEmergencyStop();
        expect(isolatedScope.emergencyStopStatus.latest).toBeTruthy();
      });

      it('should toggle emergencyt stop from on to off', function () {
        isolatedScope.emergencyStopStatus.latest = true;
        isolatedScope.toggleEmergencyStop();
        expect(isolatedScope.emergencyStopStatus.latest).toBeFalsy();
      });
    });
  });

});