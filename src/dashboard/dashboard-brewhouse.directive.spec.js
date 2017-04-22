/* eslint-disable */
describe('app.dashboard', function () {
  beforeEach(module('app.dashboard'));
  beforeEach(module('joulia.templates'));

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

  describe('dashboardBrewhouse directive', function () {
    var element, scope, controller;

    beforeEach(function () {
      element = angular.element(
        `<dashboard-brewhouse
             brewhouse="brewhouse">
         </dashboard-brewhouse>`);
      $compile(element)($rootScope.$new());
      $rootScope.$digest();
      scope = element.isolateScope() || element.scope();

      scope.brewhouse = {};
      scope.$digest();
    });

    describe('template', function () {
      describe('header', function () {
        it('contains name', function () {
          scope.brewhouse = { name: 'Foo' };
          scope.$digest();
          expect(element.find('header').html()).toContain('Foo');
        });

        describe('active marker', function () {
          it('shows active and not ready when active', function () {
            scope.brewhouse = { active: true };
            scope.$digest();
            expect(element.find('header').html()).toContain('Active');
            expect(element.find('header').html()).not.toContain('Ready');
          });

          it('shows ready and not active when inactive', function () {
            scope.brewhouse = { active: false };
            scope.$digest();
            expect(element.find('header').html()).toContain('Ready');
            expect(element.find('header').html()).not.toContain('Active');
          });
        });

        // TODO(willjschmitt): Add tests for clicking lock/unlock buttons.
      });

      describe('body', function () {
        describe('active text', function () {
          it('says currently brewing when active', function () {
            scope.brewhouse = { active: true };
            scope.$digest();
            const panelBody = element.children()[0].children[1];
            expect(panelBody.innerHTML).toContain("is currently brewing");
            expect(panelBody.innerHTML).not.toContain(
              "is not currently brewing");
          });

          it('says not currently brewing when inactive', function () {
            scope.brewhouse = { active: false };
            scope.$digest();
            const panelBody = element.children()[0].children[1];
            expect(panelBody.innerHTML).toContain("is not currently brewing");
            expect(panelBody.innerHTML).not.toContain("is currently brewing");
          });
        });

        describe('token', function () {
          it('shows token when showToken is true', function () {
            scope.brewhouse = { token: 'faketoken' };
            scope.showToken = true;
            scope.$digest();
            expect(element.html()).toContain('faketoken');
          });

          it('does not show token when showToken is false', function () {
            scope.brewhouse = { token: 'faketoken' };
            scope.showToken = false;
            scope.$digest();
            expect(element.html()).not.toContain('faketoken');
          });
        });
      });
    });

    describe('toggleShowToken', function () {
      it('should set to true, if set to false', function () {
        scope.showToken = false;
        scope.toggleShowToken();
        expect(scope.showToken).toBeTruthy();
      });

      it('should set to false, if set to true', function () {
        scope.showToken = true;
        scope.toggleShowToken();
        expect(scope.showToken).toBeFalsy();
      });
    });
  });
});
