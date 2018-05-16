/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.common', function () {
  beforeEach(angular.mock.module('app.common'));
  beforeEach(angular.mock.module('joulia.templates'));

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

  describe('sidebar-userbox directive', function () {
    var element, scope;

    beforeEach(function () {
      const html = `
        <sidebar-userbox
            user="user">
        </sidebar-userbox>`;
      scope = $rootScope.$new();
      element = $compile(html)(scope);
    });


    it('contains full name', function () {
      scope.user = { first_name: "John", last_name: "Doe" };
      scope.$digest();

      expect(element.html()).toContain('John Doe');
    });

  });

});
