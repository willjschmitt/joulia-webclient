/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.recipes recipe-instances.service', function () {
  beforeEach(angular.mock.module('app.recipes'));

  var $httpBackend;

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('recipeInstances service', function () {
    var recipeInstances;

    beforeEach(inject(function (_recipeInstances_) {
      recipeInstances = _recipeInstances_;
    }));

    it('should be defined', function() {
      expect(recipeInstances).toBeDefined();
    });

    describe('launch', function () {
      it('returns a promise', function () {
        const recipeInstanceId = 12;
        $httpBackend.when('POST', 'brewery/api/brewhouse/launch/')
          .respond({id: recipeInstanceId});
        var foo = 0;
        const recipeId = 10;
        const brewhouseId = 11;
        $httpBackend.expectPOST('brewery/api/brewhouse/launch/');
        recipeInstances.launch(recipeId, brewhouseId).then(function(response){
          foo = response.data.id;
        });
        $httpBackend.flush();
        expect(foo).toBe(recipeInstanceId);
      });
    });

    describe('end', function () {
      it('returns a promise', function () {
        $httpBackend.when('POST', 'brewery/api/brewhouse/end/')
          .respond();
        var called = false;
        const recipeInstanceId = 12;
        $httpBackend.expectPOST('brewery/api/brewhouse/end/');
        recipeInstances.end(recipeInstanceId).then(function(response){
          called = true;
        });
        $httpBackend.flush();
        expect(called).toBeTruthy();
      });
    });

  });
});
