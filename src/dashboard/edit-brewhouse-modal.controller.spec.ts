/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.dashboard add-brewhouse-modal.controller', function () {
  beforeEach(angular.mock.module('app.dashboard'));
  beforeEach(angular.mock.module('app.templates'));

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

  describe('EditBrewhouseModalController', function () {
    var controller, scope;
    var brewhouseSave, brewhouseUpdate;
    var $uibModalInstance;
    var brewery;

    beforeEach(function () {
      brewhouseSave = $httpBackend.when('POST', 'brewery/api/brewhouse')
        .respond(function (method, url, data, headers, params) {
          const id = Math.floor(Math.random());
          return [201, angular.extend({ id: id }, data)];
        });

      brewhouseUpdate = $httpBackend.whenPUT(/brewery\/api\/brewhouse\/\d+/)
        .respond(function (method, url, data, headers, params) {
          return [201, data];
        });

      $uibModalInstance = jasmine.createSpyObj(
        '$uibModalInstance', ['close', 'dismiss']);

      brewery = { id: 0, name: "Downtown Brewery" };

      scope = $rootScope.$new();
      controller = $controller('EditBrewhouseModalController', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        brewery: brewery,
        brewhouse: null,
      });
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('ok', function () {
      it('should save new brewhouse on server and close modal', function () {
        $httpBackend.expectPOST('brewery/api/brewhouse');
        scope.ok();
        $httpBackend.flush();

        expect($uibModalInstance.close).toHaveBeenCalled();
      });

      it('should update existing brewhouse on server and close modal', function () {
        scope.brewhouse.id = 1;
        $httpBackend.expectPUT('brewery/api/brewhouse/1');
        scope.ok();
        $httpBackend.flush();

        expect($uibModalInstance.close).toHaveBeenCalled();
      });
    });

    describe('cancel', function () {
      it('should dismiss modal', function () {
        scope.cancel();
        expect($uibModalInstance.dismiss).toHaveBeenCalled();
      });
    });

    describe('selectTab', function () {
      it('should disable the old tab and enable the new', function() {
        expect(scope.tabSelected.boil_kettle).toBeTruthy();
        expect(scope.tabSelected.mash_tun).toBeFalsy();
        expect(scope.tabSelected.main_pump).toBeFalsy();
        scope.selectTab('mash_tun');
        expect(scope.tabSelected.boil_kettle).toBeFalsy();
        expect(scope.tabSelected.mash_tun).toBeTruthy();
        expect(scope.tabSelected.main_pump).toBeFalsy();
      });

      it('should leave selected tab enabled', function() {
        expect(scope.tabSelected.boil_kettle).toBeTruthy();
        expect(scope.tabSelected.mash_tun).toBeFalsy();
        expect(scope.tabSelected.main_pump).toBeFalsy();
        scope.selectTab('boil_kettle');
        expect(scope.tabSelected.boil_kettle).toBeTruthy();
        expect(scope.tabSelected.mash_tun).toBeFalsy();
        expect(scope.tabSelected.main_pump).toBeFalsy();
      });
    });
  });
});