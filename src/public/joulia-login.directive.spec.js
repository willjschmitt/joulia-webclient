/* eslint-disable */
describe('app.public', function () {
  beforeEach(module('app.public'));
  beforeEach(module('joulia.templates'));

  var $rootScope, $compile;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  describe('joulia-login directive', function () {
    var element, scope;

    beforeEach(function () {
      const html = `
        <joulia-login>
        </joulia-login>`;
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.$digest();
    });

    describe('template', function () {
      it('contains some template', function () {
        expect(element.html()).toContain('Sign in to joulia');
      })
    });

  });

});
