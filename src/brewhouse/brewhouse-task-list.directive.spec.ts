/* eslint-disable */
describe('app.brewhouse', function () {
  beforeEach(angular.mock.module('app.brewhouse'));
  beforeEach(angular.mock.module('joulia.templates'));

  var $rootScope, $compile, $interval;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $interval = $injector.get('$interval');
  }));

  describe('brewhouse-task-list directive', function () {
    var element, scope, isolatedScope;
    const html = '<brewhouse-task-list></brewhouse-task-list>';

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    describe('template binding', function () {
      it ('should have some of the tasks in the html', function () {
        // This test isn't perfect, but should be sufficient. This just checks
        // a few tasks to be in the html.
        expect(element.html()).toContain('Sanitizing Soak');
        expect(element.html()).toContain('Measure Post-Boil Gravity');
        expect(element.html()).toContain('Clean Boil Kettle and Chiller');
      });
    });
  });

});