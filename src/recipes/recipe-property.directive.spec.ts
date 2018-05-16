/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

describe('app.recipes recipe-property.directive', function () {
  beforeEach(angular.mock.module('app.recipes'));
  beforeEach(angular.mock.module('joulia.templates'));

  var $compile, $rootScope;

  beforeEach(inject(function ($injector) {
    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');
  }));

  describe('recipe-property directive', function () {
    var element, scope, isolatedScope;
    const html = `
        <recipe-property
            min-appropriate="minAppropriate"
            max-appropriate="maxAppropriate"
            min-absolute="minAbsolute",
            max-absolute="maxAbsolute"
            value="value">
        </recipe-property>`;

    beforeEach(function () {
      scope = $rootScope.$new();
      scope.minAppropriate = 1.0;
      scope.maxAppropriate = 3.0;
      scope.minAbsolute = 0.0;
      scope.maxAbsolute = 4.0;
      scope.value = 2.0;
      element = $compile(html)(scope);

      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    describe('updateBar', function() {
      it('sets left', function() {
        expect(isolatedScope.barStyles.left).toBe('25%');
      });

      it('sets right', function() {
        expect(isolatedScope.barStyles.right).toBe('25%');
      });
    });

    describe('updateIndicator', function() {
      it('sets left', function() {
        expect(isolatedScope.indicatorStyles.left).toBe('50%');
      });
    });
  });
});
