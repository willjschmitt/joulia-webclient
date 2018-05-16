/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.common confirm-delete.controller', function () {
  beforeEach(angular.mock.module('app.common'));
  beforeEach(angular.mock.module('joulia.templates'));

  var $controller, $rootScope;

  beforeEach(inject(function ($injector) {
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
  }));

  describe('ConfirmDeleteController', function () {
    var controller, scope;
    var brewingCompanyQuery, brewerySave;
    var $uibModalInstance;

    beforeEach(function () {
      $uibModalInstance = jasmine.createSpyObj(
        '$uibModalInstance', ['close', 'dismiss']);

      scope = $rootScope.$new();
      controller = $controller('ConfirmDeleteController', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        name: "foo",
      });
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('ok', function () {
      it('should dismiss with close', function () {
        scope.ok();
        expect($uibModalInstance.close).toHaveBeenCalled();
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
