/* eslint-disable */
describe('app.dashboard', function () {
  beforeEach(module('app.dashboard'));
  beforeEach(module('joulia.templates'));

  var $controller, $httpBackend, $location;

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
    var controller;
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
      controller = $controller('DashboardController');
      $httpBackend.flush();
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('toggleShowBrewhouse', function () {
      it('should set to true, if not yet set', function () {
        expect(controller.showBrewhouseTokens[0]).not.toBeDefined();
        controller.toggleShowBrewhouseToken(0);
        expect(controller.showBrewhouseTokens[0]).toBeTruthy();
      });

      it('should set to true, if set to false', function () {
        controller.showBrewhouseTokens[0] = false;
        controller.toggleShowBrewhouseToken(0);
        expect(controller.showBrewhouseTokens[0]).toBeTruthy();
      });

      it('should set to false, if set to true', function () {
        controller.showBrewhouseTokens[0] = true;
        controller.toggleShowBrewhouseToken(0);
        expect(controller.showBrewhouseTokens[0]).toBeFalsy();
      });
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
        modalInstance = controller.addBrewery();
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

    describe('addBrewhouse', function () {
      var modalInstance;

      beforeEach(function () {
        modalInstance = controller.addBrewhouse({ id: 0 });
        // TODO(will): Understand why this $rootScope.$apply is needed.
        $rootScope.$apply();
      });

      it('should create a modal', function () {
        expect(modalInstance).toBeDefined();
      });

      it('should call initializeBrewerys when closed', function () {
        $httpBackend.expectGET('brewery/api/brewhouse?brewery=0');
        $httpBackend.expectGET('brewery/api/brewhouse?brewery=1');
        modalInstance.close();
        $rootScope.$apply();
        $httpBackend.flush();
      });
    });

  });
});