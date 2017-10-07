/* eslint-disable */
describe('app.brewhouse', function () {
  beforeEach(module('app.brewhouse'));
  beforeEach(module('joulia.templates'));
  beforeEach(module(function($provide) {
    $provide.factory('TimeSeriesUpdater', function () {
      function TimeSeriesUpdater(recipeInstance, name) {
        this.latest = 0;
      }

      TimeSeriesUpdater.prototype.set = function(value, callback){
        this.latest = value
        if (callback) {
          callback();
        }
      }

      return TimeSeriesUpdater;
    });
  }));

  var $rootScope, $compile;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  describe('brewhouse-equipment directive', function () {
    var element, scope;
    const html = `
        <brewhouse-equipment
            recipe-instance='recipeInstance'>
        </brewhouse-equipment>`;

    beforeEach(function() {
      scope = $rootScope.$new();
      scope.recipeInstance = { id: 12 };
      element = $compile(html)(scope);
      scope.$digest();
    })

    describe('template binding', function() {
      it('is defined', function () {
        expect(element.html()).not.toEqual('');
      });
    })
  });

});
