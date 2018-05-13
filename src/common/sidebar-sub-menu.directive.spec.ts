/* eslint-disable */
describe('app.common', function () {
  beforeEach(angular.mock.module('app.common'));
  beforeEach(angular.mock.module('joulia.templates'));

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
