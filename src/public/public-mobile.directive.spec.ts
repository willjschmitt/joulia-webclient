/* eslint-disable */
import * as angular from 'angular';
import 'angular-mocks';

describe('app.public.mobile', function () {
  beforeEach(angular.mock.module('app.public.mobile'));

  var $rootScope, $compile;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  describe('publicMobile directive', function () {
    var element, scope, controller;

    beforeEach(function () {
      element = angular.element(
        `<public-mobile>
         </public-mobile>`);
      $compile(element)($rootScope.$new());
      $rootScope.$digest();
      scope = element.isolateScope() || element.scope();
    });

    describe('template', function () {
      it('should resolve', function() {
        expect(element.html()).toContain("Responsive design for all devices");
      });
    });
  });
});
