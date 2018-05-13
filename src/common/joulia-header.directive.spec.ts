/* eslint-disable */
describe('app.common', function () {
  beforeEach(module('app.common'));
  beforeEach(module('joulia.templates'));

  // Mocks the user service, so we can manipulate user preferences from here.
  var user = {};
  beforeEach(module(function($provide) {
    $provide.service('userService', function () {
      const self = this;

      self.user = user;
    });
  }));

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
        <joulia-header>
        </joulia-header>`;
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    });


    it('contains full name', function () {
      user.first_name = "John";
      user.last_name = "Doe";
      scope.$digest();

      expect(element.html()).toContain('John Doe');
    });

    describe('toggleFullscreen', function() {
      // TODO(willjschmitt): Better tests than just running it.
      it('does not crash', function() {
        isolatedScope.toggleFullscreen();
      })

      it('toggles button value', function() {
        expect(isolatedScope.fullscreenButton).toBe('fullscreen');
        isolatedScope.toggleFullscreen();
        expect(isolatedScope.fullscreenButton).toBe('fullscreen_exit');
        isolatedScope.toggleFullscreen();
        expect(isolatedScope.fullscreenButton).toBe('fullscreen');
      });
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
