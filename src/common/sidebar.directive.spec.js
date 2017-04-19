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

  describe('sidebar directive', function () {
    var element, scope;
    var breweryQuery, brewhouseQuery;

    beforeEach(function () {
      breweryQuery = $httpBackend.when('GET', 'brewery/api/brewery')
        .respond([]);

      brewhouseQuery = $httpBackend.when('GET', 'brewery/api/brewhouse')
        .respond([]);
    });

    beforeEach(function () {
      const html = `
        <sidebar
            user="user">
        </sidebar>`;
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      $httpBackend.expectGET('brewery/api/brewery');
      $httpBackend.expectGET('brewery/api/brewhouse');
      $httpBackend.flush();
    });

  });

});
