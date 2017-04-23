/* eslint-disable */
describe('app.common', function () {
  beforeEach(module('app.common'));
  beforeEach(module('joulia.templates'));

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

  describe('joulia-header directive', function () {
    var element, scope, isolatedScope;

    beforeEach(function () {
      const html = `
        <joulia-header
            user="user">
        </joulia-header>`;
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.user = {};
      scope.$digest();
      isolatedScope = element.isolateScope();
    });


    it('contains full name', function () {
      scope.user = { first_name: "John", last_name: "Doe" };
      scope.$digest();

      expect(element.html()).toContain('John Doe');
    });

    describe('toggleFullscreen', function() {
      // TODO(willjschmitt): Better tests than just running it.
      it('does not crash', function() {
        isolatedScope.toggleFullscreen();
      })
    });

    describe('toggleSidebar', function() {
      it('broadcasts toggleSidebar', function(){
        var called = false;
        $rootScope.$on('toggleSidebar', function() {
          called = true;
        });

        isolatedScope.toggleSidebar();
        expect(called).toBeTruthy();
      });
    });

  });

});
