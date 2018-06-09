/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

import './sidebar-breweries.directive';

describe('app.sidebar.breweries', function () {
  beforeEach(angular.mock.module('app.sidebar.breweries'));

  var $rootScope, $compile, $httpBackend;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('sidebar-breweries directive', function () {
    var element, scope, isolatedScope;
    var breweryQuery, brewhouseQuery;

    const html = `<ul sidebar-breweries></ul>`;

    beforeEach(function () {
      breweryQuery = $httpBackend.when('GET', 'brewery/api/brewery')
        .respond([]);

      brewhouseQuery = $httpBackend.when('GET', 'brewery/api/brewhouse')
        .respond([]);
    });

    describe('template', function () {
      beforeEach(function () {
        scope = $rootScope.$new();
        $httpBackend.expectGET('brewery/api/brewery');
        $httpBackend.expectGET('brewery/api/brewhouse');
        element = $compile(html)(scope);
        $httpBackend.flush();
        isolatedScope = element.isolateScope();
      });

      it('contains brewerys', function () {
        isolatedScope.brewerys = [
          { name: 'Foo', brewhouse: [] },
          { name: 'Bar', brewhouse: [] },
        ];
        scope.$digest();

        expect(element.children()[1].innerHTML).toContain('Foo');
        expect(element.children()[2].innerHTML).toContain('Bar');
      });

    });

    describe('mapBreweryToBrewhouse', function () {
      it('maps correctly', function () {
        breweryQuery.respond([{ name: 'Foo', id: 0 }, { name: 'Bar', id: 1 }]);

        const brewhouse0 = { name: 'Foo', id: 0, brewery: 0 };
        const brewhouse1 = { name: 'Bar', id: 1, brewery: 1 };
        const brewhouse2 = { name: 'Baz', id: 2, brewery: 1 };
        brewhouseQuery.respond([brewhouse0, brewhouse1, brewhouse2]);

        scope = $rootScope.$new();
        $httpBackend.expectGET('brewery/api/brewery');
        $httpBackend.expectGET('brewery/api/brewhouse');
        element = $compile(html)(scope);
        $httpBackend.flush();
        isolatedScope = element.isolateScope();


        // TODO(willjschmitt): Figure out how to compare this to a populated
        // object rather than individual elements. $resource objects have a
        // $$hashKey attached to them, which we don't have in the original
        // objects.
        expect(isolatedScope.brewhouseMap[0].length).toEqual(1);
        expect(isolatedScope.brewhouseMap[0][0].id).toEqual(0);
        expect(isolatedScope.brewhouseMap[1].length).toEqual(2);
        expect(isolatedScope.brewhouseMap[1][0].id).toEqual(1);
        expect(isolatedScope.brewhouseMap[1][1].id).toEqual(2);
      })
    })

  });

});
