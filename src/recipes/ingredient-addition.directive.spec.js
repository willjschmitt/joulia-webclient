/* eslint-disable */
describe('app.recipes ingredient-addition.directive', function () {
  beforeEach(module('app.recipes'));
  beforeEach(module('joulia.templates'));

  var $compile, $httpBackend, $rootScope, breweryResources;

  beforeEach(inject(function ($injector) {
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    breweryResources = $injector.get('breweryResources');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('ingredient-addition directive', function () {
    var element, scope, isolatedScope;
    var additionUpdate, additionDelete;
    const html = `
        <ingredient-addition
            addition="addition"
            ingredient-resource="resource"
            ingredient-html="ingredientHtml"
            additions="additions"
            recipe="recipe">
        </ingredient-addition>`;

    beforeEach(function () {
      additionUpdate = $httpBackend
        .when('PUT', /brewery\/api\/malt_ingredient_addition\/\d+/)
          .respond(function (method, url, data, headers, params) {
            return [200, data];
          });
      $httpBackend
        .when('PUT', /brewery\/api\/recipe\/\d+/)
          .respond(function (method, url, data, headers, params) {
            return [200, data];
          });
      additionDelete = $httpBackend
        .when('DELETE', /brewery\/api\/malt_ingredient_addition\/\d+/)
          .respond({});
    });

    beforeEach(function () {
      scope = $rootScope.$new();
      const addition = new breweryResources.MaltIngredientAddition({
        id: 3,
        amount: 0.0,
      });
      scope.addition = addition;
      scope.resource = breweryResources.MaltIngredientSearch;
      scope.additions = [addition];
      scope.recipe = new breweryResources.Recipe({ id: 5 });
      element = $compile(html)(scope);

      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    describe('compileIngredientHTML', function() {
      it('compiles html', function() {
        scope.ingredientHtml = '<div>{{foo}}</div>';
        scope.$digest();
        const ingredient = { foo: 'bar' };
        expect(isolatedScope.ingredientHTMLCompiled(ingredient))
          .toBe('<div>bar</div>');
      })
    });

    describe('updateIngredientAddition', function() {
      it('calls update endpoint', function() {
        $httpBackend.expectPUT('brewery/api/malt_ingredient_addition/3');
        $httpBackend.expectPUT(/brewery\/api\/recipe\/\d+/);
        isolatedScope.updateIngredientAddition();
        $httpBackend.flush();
      });
    });

    describe('removeIngredientAddition', function() {
      it('calls delete endpoints', function() {
        $httpBackend.expectDELETE('brewery/api/malt_ingredient_addition/3');
        isolatedScope.removeIngredientAddition();
        $httpBackend.flush();
      });

      it('removes the ingredient addition', function() {
        expect(scope.additions.length).toBe(1);
        $httpBackend.expectDELETE('brewery/api/malt_ingredient_addition/3');
        isolatedScope.removeIngredientAddition();
        $httpBackend.flush();

        expect(scope.additions.length).toBe(0);
      });
    });

    describe('refreshIngredients', function() {
      var maltIngredientQuery;

      beforeEach(function(){
        maltIngredientQuery = $httpBackend.whenGET(
          /brewery\/api\/malt_ingredient\?.*/).respond([]);
      });

      it('searches when id is only present', function() {
        scope.addition.ingredient = 10;
        $httpBackend.expectGET('brewery/api/malt_ingredient?id=10');
        isolatedScope.refreshIngredients();
        $httpBackend.flush();
      });

      it('searches when search is only present and ingredient null',
        function() {
        scope.addition.ingredient = null;
        $httpBackend.expectGET('brewery/api/malt_ingredient?search=foo');
        isolatedScope.refreshIngredients("foo");
        $httpBackend.flush();
      });

      it('searches when search is only present and ingredient undefined',
        function() {
        scope.addition.ingredient = undefined;
        $httpBackend.expectGET('brewery/api/malt_ingredient?search=foo');
        isolatedScope.refreshIngredients("foo");
        $httpBackend.flush();
      });

      it('searches when search and ingredient are defined', function() {
        scope.addition.ingredient = 10;
        $httpBackend.expectGET('brewery/api/malt_ingredient?search=foo&id=10');
        isolatedScope.refreshIngredients("foo");
        $httpBackend.flush();
      });

      it('searches when search and ingredient aren\'t present', function() {
        scope.addition.ingredient = null;
        isolatedScope.refreshIngredients();
      });
    });

    // Order matters, since the update function will modify our intermediate
    // variables.
    describe('updateMutuallyCoupledVariables', function() {
      it('updates amount when the conversion changes', function() {
        isolatedScope.userAmount = 1.0;
        scope.$digest();
        scope.addition.units = breweryResources.UNITS_CHOICES.KILOGRAMS.value;
        scope.$digest();
        $httpBackend.flush();
        expect(scope.addition.amount).toBe(1000.0);
      });

      it('updates amount when the user presented amount changes', function() {
        scope.addition.units = breweryResources.UNITS_CHOICES.KILOGRAMS.value;
        scope.$digest();
        isolatedScope.userAmount = 1.0;
        scope.$digest();
        $httpBackend.flush();
        expect(scope.addition.amount).toBe(1000.0);
      });

      it('updates user amount when the server changes the amount', function() {
        scope.addition.units = breweryResources.UNITS_CHOICES.KILOGRAMS.value;
        scope.$digest();
        scope.addition.amount = 1000.0;
        scope.$digest();
        expect(isolatedScope.userAmount).toBe(1.0);
      });
    });

    describe('calculateUnitsToGrams', function() {
      it('updates unitsToGrams when units change', function() {
        scope.addition.units = breweryResources.UNITS_CHOICES.KILOGRAMS.value;
        scope.$digest();
        expect(isolatedScope.unitsToGrams).toBe(0.001);
        scope.addition.units = breweryResources.UNITS_CHOICES.GRAMS.value;
        scope.$digest();
        expect(isolatedScope.unitsToGrams).toBe(1.0);
      })
    });
  });
});
