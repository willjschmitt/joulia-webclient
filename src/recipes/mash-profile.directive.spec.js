/* eslint-disable */
describe('app.recipes mash-profile.directive', function () {
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

  describe('mash-profile directive', function () {
    var element, scope, isolatedScope;
    var mashPointSave;
    const html = `
        <mash-profile
            mash-points="mashPoints"
            recipe="recipe">
        </mash-profile>`;

    beforeEach(function () {
      mashPointSave = $httpBackend
        .when('POST', 'brewery/api/mash_point')
          .respond(function (method, url, data, headers, params) {
            const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            return [201, angular.extend({ id: id }, data)];
          });
    });

    beforeEach(function () {
      scope = $rootScope.$new();
      scope.mashPoints = [];
      scope.recipe = {id: 23};
      element = $compile(html)(scope);

      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    describe('addMashPoint', function () {
      it('adds new MashPoint', function () {
        $httpBackend.expectPOST('brewery/api/mash_point');
        isolatedScope.addMashPoint();
        $httpBackend.flush();
        expect(scope.mashPoints[0]).toBeDefined();
      });
    });

    describe('updateMashPoint', function () {
      it('updates mashPoint', function () {
        $httpBackend.when('PUT', 'brewery/api/mash_point/19')
          .respond(function (method, url, data, headers, params) {
            return [200, data];
          });
        const existingMashPoint = new breweryResources.MashPoint({ id: 19 });
        $httpBackend.expectPUT('brewery/api/mash_point/19');
        isolatedScope.updateMashPoint(existingMashPoint);
        $httpBackend.flush();
      });
    });

    describe('removeMashPoint', function () {
      it('removes mashPoint', function () {
        $httpBackend.expectPOST('brewery/api/mash_point');
        $httpBackend.expectPOST('brewery/api/mash_point');
        isolatedScope.addMashPoint();
        isolatedScope.addMashPoint();
        $httpBackend.flush();
        expect(scope.mashPoints.length).toEqual(2);

        const mashPoint1 = scope.mashPoints[0];
        const mashPoint2 = scope.mashPoints[1];

        $httpBackend.when('DELETE', 'brewery/api/mash_point/' + mashPoint1.id)
          .respond(function (method, url, data, headers, params) {
            return [200, {}];
          });
        $httpBackend.expectDELETE('brewery/api/mash_point/' + mashPoint1.id);
        isolatedScope.removeMashPoint(mashPoint1);
        $httpBackend.flush();
        expect(scope.mashPoints.length).toBe(1);
        expect(scope.mashPoints).not.toContain(mashPoint1);
        expect(scope.mashPoints).toContain(mashPoint2);
      });
    });

    describe('promoteMashPoint', function () {
      it('should promote', function () {
        $httpBackend.expectPOST('brewery/api/mash_point');
        $httpBackend.expectPOST('brewery/api/mash_point');
        isolatedScope.addMashPoint();
        isolatedScope.addMashPoint();
        $httpBackend.flush();
        expect(scope.mashPoints.length).toEqual(2);

        const mashPoint1 = scope.mashPoints[0];
        mashPoint1.index = 0;
        mashPoint1.id = 10;
        const mashPoint2 = scope.mashPoints[1];
        mashPoint2.index = 1;
        mashPoint2.id = 11;

        // TODO(willjschmitt): Make these regexps for the urls. I can't for
        // some silly reason get regexp recognition to work here.
        $httpBackend.when('PUT', 'brewery/api/mash_point/10')
          .respond(function (method, url, data, headers, params) {
            return [200, data];
          });
        $httpBackend.when('PUT', 'brewery/api/mash_point/11')
          .respond(function (method, url, data, headers, params) {
            return [200, data];
          });

        $httpBackend.expectPUT('brewery/api/mash_point/' + mashPoint1.id);
        $httpBackend.expectPUT('brewery/api/mash_point/' + mashPoint2.id);
        $httpBackend.expectPUT('brewery/api/mash_point/' + mashPoint1.id);
        isolatedScope.promoteMashPoint(mashPoint2);
        $httpBackend.flush();

        expect(mashPoint1.index).toBe(1);
        expect(mashPoint2.index).toBe(0);
        expect(scope.mashPoints[0].id).toBe(mashPoint2.id);
        expect(scope.mashPoints[1].id).toBe(mashPoint1.id);
      });

      it('should throw error when promoting first point', function () {
        $httpBackend.expectPOST('brewery/api/mash_point');
        isolatedScope.addMashPoint();
        $httpBackend.flush();
        expect(scope.mashPoints.length).toEqual(1);
        expect(function(){
            isolatedScope.promoteMashPoint(scope.mashPoints[0]);
        }).toThrow(new Error('Cannot promote first mash point.'));
      });
    });

    describe('demoteMashPoint', function () {
      it('should demote', function () {
        $httpBackend.expectPOST('brewery/api/mash_point');
        $httpBackend.expectPOST('brewery/api/mash_point');
        isolatedScope.addMashPoint();
        isolatedScope.addMashPoint();
        $httpBackend.flush();
        expect(scope.mashPoints.length).toEqual(2);

        const mashPoint1 = scope.mashPoints[0];
        mashPoint1.index = 0;
        mashPoint1.id = 10;
        const mashPoint2 = scope.mashPoints[1];
        mashPoint2.index = 1;
        mashPoint2.id = 11;

        // TODO(willjschmitt): Make these regexps for the urls. I can't for
        // some silly reason get regexp recognition to work here.
        $httpBackend.when('PUT', 'brewery/api/mash_point/10')
          .respond(function (method, url, data, headers, params) {
            return [200, data];
          });
        $httpBackend.when('PUT', 'brewery/api/mash_point/11')
          .respond(function (method, url, data, headers, params) {
            return [200, data];
          });

        $httpBackend.expectPUT('brewery/api/mash_point/' + mashPoint2.id);
        $httpBackend.expectPUT('brewery/api/mash_point/' + mashPoint1.id);
        $httpBackend.expectPUT('brewery/api/mash_point/' + mashPoint2.id);
        isolatedScope.demoteMashPoint(mashPoint1);
        $httpBackend.flush();

        expect(mashPoint1.index).toBe(1);
        expect(mashPoint2.index).toBe(0);
        expect(scope.mashPoints[0].id).toBe(mashPoint2.id);
        expect(scope.mashPoints[1].id).toBe(mashPoint1.id);
      });

      it('should throw error when demoting last point', function () {
        $httpBackend.expectPOST('brewery/api/mash_point');
        isolatedScope.addMashPoint();
        $httpBackend.flush();
        expect(scope.mashPoints.length).toEqual(1);
        expect(function(){
          isolatedScope.demoteMashPoint(scope.mashPoints[0]);
        }).toThrow(new Error('Cannot demote last mash point.'));
      });
    });
  });
});
