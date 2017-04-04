/* eslint-disable */
describe('app.dashboard add-brewery-modal.controller', function () {
  beforeEach(module('app.dashboard'));
  beforeEach(module('joulia.templates'));

  var $controller, $httpBackend, $rootScope, $location;

  beforeEach(inject(function ($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('AddBreweryModalController', function () {
    var controller;
    var brewingCompanyQuery, brewerySave;
    var $uibModalInstance;

    beforeEach(function () {
      brewingCompanyQuery = $httpBackend.when(
          'GET', 'brewery/api/brewingCompany')
        .respond([
          { group: 0, name: "Brewing Company 1" },
          { group: 1, name: "Brewing Company 2" }]);

      brewerySave = $httpBackend.when('POST', 'brewery/api/brewery')
        .respond(function (method, url, data, headers, params) {
          const id = Math.floor(Math.random());
          return [201, angular.extend({ id: id }, data)];
        });

      $uibModalInstance = jasmine.createSpyObj(
        '$uibModalInstance', ['close', 'dismiss']);

      $httpBackend.expectGET('brewery/api/brewingCompany');
      controller = $controller('AddBreweryModalController', {
        $uibModalInstance: $uibModalInstance
      });
      $httpBackend.flush();
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('ok', function () {
      it('should save new brewery on server and close modal', function () {
        $httpBackend.expectPOST('brewery/api/brewery');
        controller.ok();
        $httpBackend.flush();

        expect($uibModalInstance.close).toHaveBeenCalled();
      });
    });

    describe('cancel', function () {
      it('should dismiss modal', function () {
        controller.cancel();
        expect($uibModalInstance.dismiss).toHaveBeenCalled();
      });
    });
  });
});