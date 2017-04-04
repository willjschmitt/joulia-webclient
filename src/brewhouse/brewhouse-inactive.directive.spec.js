/* eslint-disable */
describe('app.brewhouse', function () {
  beforeEach(module('app.brewhouse'));
  beforeEach(module('joulia.templates'));

  var $rootScope, $compile, $interval;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $interval = $injector.get('$interval');
  }));

  describe('brewhouse-terminator directive', function () {
    var element, scope, isolatedScope;
    const html = '<brewhouse-inactive></brewhouse-inactive>';

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    it('exists with proper text', function () {
      expect(element.html()).toContain('Brewhouse not active');
      expect(element.html()).toContain(
        'Brewhouse is not active. Visit the recipes page to launch a recipe.');
    });
  });

});