/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.common select-brewing-company.controller', function () {
  beforeEach(angular.mock.module('app.dashboard'));
  beforeEach(angular.mock.module('joulia.templates'));

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

  describe('SelectBrewingCompanyController', function () {
    var controller, scope;
    var brewingCompanyQuery, brewerySave;
    var $uibModalInstance;

    beforeEach(function () {
      brewingCompanyQuery = $httpBackend.when(
          'GET', 'brewery/api/brewingCompany')
        .respond([
          { group: 0, name: "Brewing Company 1" },
          { group: 1, name: "Brewing Company 2" }]);

      $uibModalInstance = jasmine.createSpyObj(
        '$uibModalInstance', ['close', 'dismiss']);

      $httpBackend.expectGET('brewery/api/brewingCompany');
      scope = $rootScope.$new();
      controller = $controller('SelectBrewingCompanyController', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
      });
      $httpBackend.flush();
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('ok', function () {
      it('should return selected brewery', function () {
        scope.selectedCompany = 1;
        scope.ok();
        expect($uibModalInstance.close).toHaveBeenCalledWith(1);
      });
    });

    describe('cancel', function () {
      it('should dismiss modal', function () {
        scope.cancel();
        expect($uibModalInstance.dismiss).toHaveBeenCalled();
      });
    });
  });
});
