/* eslint-disable */
describe('app.public', function () {
  beforeEach(module('app.public'));
  beforeEach(module('joulia.templates'));

  var $rootScope, $compile;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  describe('publicHeader directive', function () {
    var element, scope, controller;

    beforeEach(function () {
      element = angular.element(
        `<public-header>
         </public-header>`);
      $compile(element)($rootScope.$new());
      $rootScope.$digest();
      scope = element.isolateScope() || element.scope();
    });

    describe('template', function () {
      it('should resolve', function() {
        expect(element.html()).toContain("Joulia helps you brew better beer");
      });
    });
  });
});
