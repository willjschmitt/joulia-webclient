/* eslint-disable */
describe('app.common', function () {
  beforeEach(module('app.common'));
  beforeEach(module('joulia.templates'));

  var $controller, $httpBackend, $location;

  beforeEach(module(function($provide) {
    $provide.value('TimeSeriesUpdater', function () { 
      const self = this;
      self.latest = null;
      self.set = function(value, callback) {
        self.latest = value;
        if (!!callback) {
          callback();
        }
      }
      return self;
    });
  }));

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('toggleableElement directive', function () {
    var element, scope, controller;

    beforeEach(function () {
      
      element = angular.element(
        `<toggleable-element
             name="name"
             recipe-instance="recipeInstance"
             sensor-name="sensorName">
         </toggleable-element>`);
      $compile(element)($rootScope.$new());
      $rootScope.$digest();

      controller = element.controller('toggleableElement');
      scope = element.isolateScope() || element.scope();

      scope.name = 'Fake Name';
      scope.recipeInstance = 0;
      scope.sensorName = "fake_name";
      scope.$digest();
    });

    describe('header', function () {
      it('header contains title', function () {
        scope.$digest();
        expect(element.find('header').html()).toContain('Fake Name');
      });
    });

    describe('on/off status text', function () {
      it('shows ON elementStatus is true', function () {
        scope.elementStatus.latest = true;
        scope.$digest();
        expect(element.html()).toContain('ON');
        expect(element.html()).not.toContain('OFF');
      });

      it('shows OFF elementStatus is false', function () {
        scope.elementStatus.latest = false;
        scope.$digest();
        expect(element.html()).toContain('OFF');
        expect(element.html()).not.toContain('ON');
      });
    });

    describe('override status text', function () {
      it('shows OVERRIDDEN elementOverride is true', function () {
        scope.elementOverride.latest = true;
        scope.$digest();
        expect(element.html()).toContain('OVERRIDDEN');
      });

      it('shows nothing when elementOverride is false', function () {
        scope.elementOverride.latest = false;
        scope.$digest();
        expect(element.html()).not.toContain('OVERRIDDEN');
      });
    });

    describe('toggleElementStatus', function () {
      it('toggles element status from true to false', function () {
        scope.elementStatus.latest = true;
        scope.toggleElementStatus();
        expect(scope.elementStatus.latest).toBe(false);
      });

      it('toggles element status from false to true', function () {
        scope.elementStatus.latest = false;
        scope.toggleElementStatus();
        expect(scope.elementStatus.latest).toBe(true);
      });
    });

    describe('setElementStatus', function () {
      it('sets status true', function () {
        scope.setElementStatus(true);
        expect(scope.elementStatus.latest).toBe(true);
      });

      it('sets status false', function () {
        scope.setElementStatus(false);
        expect(scope.elementStatus.latest).toBe(false);
      });

      it('overrides first before setting false', function () {
        scope.elementOverride.latest = false;
        scope.elementStatus.latest = true;
        scope.setElementStatus(false);
        expect(scope.elementOverride.latest).toBe(true);
        expect(scope.elementStatus.latest).toBe(false);
      });

      it('leaves override before immediately setting false', function () {
        scope.elementOverride.latest = true;
        scope.elementStatus.latest = true;
        scope.setElementStatus(false);
        expect(scope.elementOverride.latest).toBe(true);
        expect(scope.elementStatus.latest).toBe(false);
      });
    });

    describe('toggleElementOverride', function () {
      it('toggles element override from true to false', function () {
        scope.elementOverride.latest = true;
        scope.toggleElementOverride();
        expect(scope.elementOverride.latest).toBe(false);
      });

      it('toggles element status from false to true', function () {
        scope.elementOverride.latest = false;
        scope.toggleElementOverride();
        expect(scope.elementOverride.latest).toBe(true);
      });
    });

    describe('setElementOverride', function () {
      it('sets status true', function () {
        scope.setElementOverride(true);
        expect(scope.elementOverride.latest).toBe(true);
      });

      it('sets status false', function () {
        scope.setElementOverride(false);
        expect(scope.elementOverride.latest).toBe(false);
      });
    });
  });
});
