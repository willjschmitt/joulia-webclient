/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.public', function () {
  beforeEach(angular.mock.module('app.public'));
  beforeEach(angular.mock.module('app.templates'));

  var $rootScope, $compile;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  describe('publicFeatures directive', function () {
    var element, scope, controller;

    beforeEach(function () {
      element = angular.element(
        `<public-features>
         </public-features>`);
      $compile(element)($rootScope.$new());
      $rootScope.$digest();
      scope = element.isolateScope() || element.scope();
    });

    describe('template', function () {
      it('should resolve', function() {
        expect(element.html()).toContain("Electric brewing at your fingertips");
      });
    });
  });
});
