/* eslint-disable */
import * as angular from 'angular';
import 'angular-mocks';

describe('app.public.join', function () {
  beforeEach(angular.mock.module('app.public.join'));

  var $rootScope, $compile;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  describe('publicJoin directive', function () {
    var element, scope, controller;

    beforeEach(function () {
      element = angular.element(
        `<public-join>
         </public-join>`);
      $compile(element)($rootScope.$new());
      $rootScope.$digest();
      scope = element.isolateScope() || element.scope();
    });

    describe('template', function () {
      it('should resolve', function() {
        expect(element.html()).toContain("Ready to brew?");
      });
    });
  });
});
