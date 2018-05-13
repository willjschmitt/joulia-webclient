/* eslint-disable */
describe('app.dashboard', function () {
  beforeEach(angular.mock.module('app.dashboard'));
  beforeEach(angular.mock.module('joulia.templates'));

  var $controller, $httpBackend, $rootScope, $compile;

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('dashboardBrewery directive', function () {
    var element, scope, controller;

    beforeEach(function () {
      element = angular.element(
        `<dashboard-brewery
             brewery="brewery"
             brewhouses="brewhouses">
         </dashboard-brewery>`);
      $compile(element)($rootScope.$new());
      $rootScope.$digest();
      scope = element.isolateScope() || element.scope();

      scope.brewery = {};
      scope.brewhouses = [];
      scope.$digest();
    });

    describe('template', function () {
      it('should contain name in title', function() {
        scope.brewery = { name: "Foo" };
        scope.$digest();
        expect(element.children()[0].innerHTML).toContain("Foo");
      });

      // TODO(willjschmitt): Add test that clicks add brewhouse button.

      it('should have brewhouses', function () {
        scope.brewhouses = [{ name: 'Foo' }, { name: 'Bar' }];
        scope.$digest();
        const brewhouseRow = element.children()[1];
        const dashboardBrewhouses = brewhouseRow.children;
        expect(dashboardBrewhouses.length).toBe(2);
        expect(dashboardBrewhouses[0].innerHTML).toContain('Foo');
        expect(dashboardBrewhouses[1].innerHTML).toContain('Bar');
      });
    });

    describe('addBrewhouse', function () {
      var modalInstance;

      beforeEach(function () {
        modalInstance = scope.addBrewhouse();
        $rootScope.$apply();
      });

      it('should create a modal', function () {
        expect(modalInstance).toBeDefined();
      });

      it('should add new brewhouse when closed', function () {
        expect(scope.brewhouses.length).toBe(0);
        modalInstance.close({ id: 11 });
        $rootScope.$apply();
        expect(scope.brewhouses.length).toBe(1);
        expect(scope.brewhouses[0].id).toEqual(11);
      });
    });
  });
});
