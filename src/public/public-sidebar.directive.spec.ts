/* eslint-disable */
import angular = require('angular');
import * as $ from 'jquery';
import 'angular-mocks';

describe('app.public', function () {
  beforeEach(angular.mock.module('app.public'));
  beforeEach(angular.mock.module('app.templates'));

  var $rootScope, $compile, $document;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $document = $injector.get('$document');
  }));

  describe('publicSidebar directive', function () {
    var element, scope, controller;

    beforeEach(function () {
      element = angular.element(
        `<public-sidebar>
         </public-sidebar>`);
      $compile(element)($rootScope.$new());
      $rootScope.$digest();
      scope = element.isolateScope() || element.scope();
    });

    describe('template', function () {
      it('should resolve', function() {
        expect(element.html()).toContain("sidebar-wrapper");
      });
    });

    describe('toggleSidebar', function() {
      it('toggles on', function() {
        scope.showSidebar = false;
        scope.toggleSidebar();
        expect(scope.showSidebar).toBeTruthy();
      });

      it('toggles off', function() {
        scope.showSidebar = true;
        scope.toggleSidebar();
        expect(scope.showSidebar).toBeFalsy();
      });
    });

    describe('document click', function() {
      it('closes the sidebar', function() {
        scope.showSidebar = true;
        $($document).click();
        expect(scope.showSidebar).toBeFalsy()
      });

      it('leaves the sidebar closed', function() {
        scope.showSidebar = false;
        $($document).click();
        expect(scope.showSidebar).toBeFalsy()
      });
    })
  });
});
