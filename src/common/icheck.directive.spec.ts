/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

import './icheck.directive';

describe('app.common', function () {
  beforeEach(angular.mock.module('app.common.icheck'));

  var $httpBackend, $rootScope, $compile;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('icheck directive', function () {
    var element, scope, isolatedScope;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile('<input icheck ng-model="checked" />')(scope);
      scope.$digest();
    });

    // TODO(willjschmitt): Add better tests. Binding to the event listeners has
    // been less than easy.
    it('should be defined', function () {
      expect(element).toBeDefined();
    });
  });

});