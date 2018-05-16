/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.dashboard', function () {
  beforeEach(angular.mock.module('app.dashboard'));
  beforeEach(angular.mock.module('joulia.templates'));

  var $controller, $httpBackend, $rootScope;

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('DashboardController', function () {
    var controller, scope;
    var breweryQuery, brewhouseQuery;

    var expectedBrewhouses = {
      "0": [
        { id: 0, name: "10 BBL System", brewery: 0 },
        { id: 1, name: "20 BBL System", brewery: 0 },
      ],
      "1": [
        { id: 2, name: "1 BBL System", brewery: 1 },
      ],
    }

    beforeEach(function () {
      breweryQuery = $httpBackend.when('GET', 'brewery/api/brewery')
        .respond([
          { id: 0, name: 'Downtown Brewery', company: 0 },
          { id: 1, name: 'Experimental Brewery', company: 0 }
        ]);

      brewhouseQuery = $httpBackend.whenRoute(
          'GET', 'brewery/api/brewhouse',
          undefined, undefined, ['brewery'])
        .respond(function(method, url, data, headers, params) {
          return [200, expectedBrewhouses[params.brewery]];
        });

      $httpBackend.expectGET('brewery/api/brewery');
      $httpBackend.expectGET('brewery/api/brewhouse?brewery=0');
      $httpBackend.expectGET('brewery/api/brewhouse?brewery=1');
      scope = $rootScope.$new();
      controller = $controller('DashboardController', { $scope: scope });
      $httpBackend.flush();
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('addBrewery', function () {
      var modalInstance;
      var brewingCompanyQuery, brewerySave;

      beforeEach(function () {
        brewingCompanyQuery = $httpBackend.when(
          'GET', 'brewery/api/brewingCompany')
        .respond([
          { group: 0, name: "Brewing Company 1" },
          { group: 1, name: "Brewing Company 2" }]);

        $httpBackend.expectGET('brewery/api/brewingCompany');
        modalInstance = scope.addBrewery();
        $httpBackend.flush();
      });

      it('should create a modal', function () {
        expect(modalInstance).toBeDefined();
      });

      it('should call updateBrewerys when closed', function () {
        $httpBackend.expectGET('brewery/api/brewery');
        $httpBackend.expectGET('brewery/api/brewhouse?brewery=0');
        $httpBackend.expectGET('brewery/api/brewhouse?brewery=1');
        modalInstance.close();
        $rootScope.$apply();
        $httpBackend.flush();
      });
    });
  });
});