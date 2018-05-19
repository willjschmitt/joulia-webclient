/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.public.screenshots', function () {
  beforeEach(angular.mock.module('app.public.screenshots'));

  var $rootScope, $compile;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  describe('publicScreenshots directive', function () {
    var element, scope, controller;

    beforeEach(function () {
      element = angular.element(
        `<public-screenshots>
         </public-screenshots>`);
      $compile(element)($rootScope.$new());
      $rootScope.$digest();
      scope = element.isolateScope() || element.scope();
    });

    describe('template', function () {
      it('should resolve', function() {
        expect(element.html()).toContain("Screenshots");
      });
    });
  });
});
