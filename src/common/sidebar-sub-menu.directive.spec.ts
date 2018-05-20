/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

import './sidebar-sub-menu.directive';

describe('app.common.sidebar-sub-menu', function () {
  beforeEach(angular.mock.module('app.common.sidebar-sub-menu'));

  var $rootScope, $compile, $httpBackend;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  describe('sidebar-sub-menu directive', function () {
    var element, scope, isolatedScope;

    beforeEach(function () {
      const html = `
        <sidebar-sub-menu></sidebar-sub-menu>`;
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.user = {};
      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    it('compiles html', function () {
      expect(element.html()).toContain('submenu-inner-wrapper');
    });

  });

});
