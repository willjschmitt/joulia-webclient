/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.common searchable-select.directive', function () {
  beforeEach(angular.mock.module('app.common'));
  beforeEach(angular.mock.module('joulia.templates'));

  var $compile, $httpBackend, $rootScope, breweryResources;

  beforeEach(inject(function ($injector) {
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    breweryResources = $injector.get('breweryResources');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('searchable-select directive', function () {
    var element, scope, isolatedScope;
    var additionUpdate, additionDelete;
    var maltIngredientQuery;
    const html = `
        <searchable-select
            parent="parent"
            attribute="'child'"
            search-resource="resource"
            item-html="itemHtml"
            change="updateParent">
        </searchable-select>`;

    beforeEach(function () {
      scope = $rootScope.$new();
      scope.parent = undefined;
      scope.resource = breweryResources.MaltIngredientSearch;
      scope.recipe = new breweryResources.Recipe({ id: 5 });
      element = $compile(html)(scope);

      scope.$digest();
      isolatedScope = element.isolateScope();

      maltIngredientQuery = $httpBackend.whenGET(
        /brewery\/api\/malt_ingredient\?.*/).respond([
          { id: 10, foo: 'bar' },
        ]);
    });

    describe('compileItemHTML', function() {
      it('compiles html', function() {
        scope.itemHtml = '<div>{{foo}}</div>';
        scope.$digest();
        const child = { id: 10, foo: 'bar' };
        expect(isolatedScope.itemHTMLCompiled(child))
          .toBe('<div>bar</div>');
      })
    });

    describe('refreshItems', function() {
      it('searches when id is only present', function() {
        scope.parent = { child: 10 };
        scope.$digest();
        $httpBackend.expectGET('brewery/api/malt_ingredient?id=10');
        isolatedScope.refreshItems();
        $httpBackend.flush();
      });

      it('searches when search is only present and child null',
        function() {
        scope.parent = null;
        scope.$digest();
        $httpBackend.expectGET('brewery/api/malt_ingredient?search=foo');
        isolatedScope.refreshItems("foo");
        $httpBackend.flush();
      });

      it('searches when search is only present and child undefined',
        function() {
        scope.parent = undefined;
        scope.$digest();
        $httpBackend.expectGET('brewery/api/malt_ingredient?search=foo');
        isolatedScope.refreshItems("foo");
        $httpBackend.flush();
      });

      it('searches when search and child are defined', function() {
        scope.parent = { child: 10 };
        scope.$digest();
        $httpBackend.expectGET('brewery/api/malt_ingredient?id=10&search=foo');
        isolatedScope.refreshItems("foo");
        $httpBackend.flush();
      });
    });
  });
});
