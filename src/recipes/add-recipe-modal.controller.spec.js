/* eslint-disable */
describe('app.recipes add-recipe-modal.controller', function () {
  beforeEach(module('app.recipes'));
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

  describe('AddRecipeModalController', function () {
    var controller, scope;
    var beerStyleQuery, recipeSave;
    var $uibModalInstance;

    beforeEach(function () {
      beerStyleQuery = $httpBackend.when('GET', 'brewery/api/beerStyle')
        .respond([
          { id: 0, name: "American IPA" },
          { id: 2, name: "Russian Imperial Stout" }]);

      recipeSave = $httpBackend.when('POST', 'brewery/api/recipe')
        .respond(function (method, url, data, headers, params) {
          const id = Math.floor(Math.random());
          return [201, angular.extend({ id: id }, data)];
        });

      $uibModalInstance = jasmine.createSpyObj(
        '$uibModalInstance', ['close', 'dismiss']);

      $httpBackend.expectGET('brewery/api/beerStyle');
      scope = $rootScope.$new();
      controller = $controller('AddRecipeModalController', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance
      });
      $httpBackend.flush();
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('ok', function () {
      it('should save new recipe on server and close modal', function () {
        $httpBackend.expectPOST('brewery/api/recipe');
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
  });
});