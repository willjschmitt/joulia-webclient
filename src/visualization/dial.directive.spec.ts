/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

import './dial.directive';

describe('app.visualization.dial', function () {
  beforeEach(angular.mock.module('app.visualization.dial'));

  var $httpBackend, $rootScope, $compile, $interval;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $interval = $injector.get('$interval');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('dial directive', function () {
    var element, scope, isolatedScope;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile('<dial title="title" value="value"></dial>')(scope);
      scope.$digest();
    });

    it('header contains title', function () {
      scope.title = 'Fake Title';
      scope.value = 0.0;
      scope.$digest();
      expect(element.find('header').html()).toContain('Fake Title');
    });

    it('sets colorClass to primary at 0.0', function () {
      scope.value = 0.0;
      $interval.flush(1000.0);
      scope.$digest();
      expect(element.html()).toContain('cc-spc-primary');
      expect(element.html()).not.toContain('cc-spc-success');
      expect(element.html()).not.toContain('cc-spc-info');
      expect(element.html()).not.toContain('cc-spc-warning');
      expect(element.html()).not.toContain('cc-spc-danger');
    });

    it('sets colorClass to success at 0.1', function () {
      scope.value = 0.1;
      $interval.flush(1000.0);
      scope.$digest();
      expect(element.html()).not.toContain('cc-spc-primary');
      expect(element.html()).toContain('cc-spc-success');
      expect(element.html()).not.toContain('cc-spc-info');
      expect(element.html()).not.toContain('cc-spc-warning');
      expect(element.html()).not.toContain('cc-spc-danger');
    });

    it('sets colorClass to info at 0.6', function () {
      scope.value = 0.6;
      $interval.flush(1000.0);
      scope.$digest();
      expect(element.html()).not.toContain('cc-spc-primary');
      expect(element.html()).not.toContain('cc-spc-success');
      expect(element.html()).toContain('cc-spc-info');
      expect(element.html()).not.toContain('cc-spc-warning');
      expect(element.html()).not.toContain('cc-spc-danger');
    });

    it('sets colorClass to warning at 0.8', function () {
      scope.value = 0.8;
      $interval.flush(1000.0);
      scope.$digest();
      expect(element.html()).not.toContain('cc-spc-primary');
      expect(element.html()).not.toContain('cc-spc-success');
      expect(element.html()).not.toContain('cc-spc-info');
      expect(element.html()).toContain('cc-spc-warning');
      expect(element.html()).not.toContain('cc-spc-danger');
    });

    it('sets colorClass to danger at 0.95', function () {
      scope.value = 0.95;
      $interval.flush(1000.0);
      scope.$digest();
      expect(element.html()).not.toContain('cc-spc-primary');
      expect(element.html()).not.toContain('cc-spc-success');
      expect(element.html()).not.toContain('cc-spc-info');
      expect(element.html()).not.toContain('cc-spc-warning');
      expect(element.html()).toContain('cc-spc-danger');
    });
  });

});