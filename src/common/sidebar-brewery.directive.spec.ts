/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

import './sidebar-brewery.directive';

describe('app.common.sidebar-brewery', function () {
  beforeEach(angular.mock.module('app.common.sidebar-brewery'));

  var $rootScope, $compile;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  describe('sidebar-brewery directive', function () {
    var element, scope, isolatedScope;

    const html = `
        <li
            sidebar-brewery
            brewery="brewery"
            brewhouses="brewhouses">
        </li>`;

    beforeEach(function () {
      scope = $rootScope.$new();
      scope.brewery = {};
      scope.brewhouses = [];
      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    describe('template', function () {
      it('has brewery name', function () {
        scope.brewery.name = 'Foo';
        scope.$digest();

        expect(element.children()[0].innerHTML).toContain('Foo');
      });

      it('contains brewhouse badges', function () {
        scope.brewhouses[0] = [{}];
        scope.$digest();

        expect(element.children()[0].innerHTML).toContain('1');
      });

      it('contains brewhouses', function() {
        scope.brewery = { name: 'Foo', id: 0 };
        scope.brewhouses = [{ name: 'Baz', id: 0 }];
        scope.$digest();

        expect(element.children()[1].children.length).toBe(1);
        const brewhouseHTML = element.children()[1].children[0].innerHTML;
        expect(brewhouseHTML).toContain('#!/brewhouse/0');
        expect(brewhouseHTML).toContain('Baz');
        expect(brewhouseHTML).not.toContain('Active');
      });

      describe('active label', function () {
        it('has active label when active', function (){
          scope.brewhouses = [{ name: 'Baz', id: 0, active: true }];
          scope.$digest();

          const brewhouseHTML = element.children()[1].children[0].innerHTML;
          expect(brewhouseHTML).toContain('Active');
        });

        it('does not have active label when active', function (){
          scope.brewhouses = [{ name: 'Baz', id: 0, active: false }];
          scope.$digest();

          const brewhouseHTML = element.children()[1].children[0].innerHTML;
          expect(brewhouseHTML).not.toContain('Active');
        });
      });

    });

    describe('toggleBrewhouses', function() {
      it('toggles from showing to not', function () {
        isolatedScope.brewhousesClass = 'show-sub-menu';
        element.addClass('open');
        isolatedScope.toggleBrewhouses();
        expect(isolatedScope.brewhousesClass).toBe('hide-sub-menu');
        expect(element.hasClass('open')).toBeFalsy();
      });

      it('toggles from not showing to showing', function () {
        isolatedScope.brewhousesClass = 'hide-sub-menu';
        isolatedScope.toggleBrewhouses();
        expect(isolatedScope.brewhousesClass).toBe('show-sub-menu');
        expect(element.hasClass('open')).toBeTruthy();
      });
    })

  });

});
