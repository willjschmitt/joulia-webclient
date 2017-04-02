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

  var $rootScope, $compile, $interval;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $interval = $injector.get('$interval');
  }));

  describe('brewhouse-status directive', function () {
    var element, scope, isolatedScope;
    const html = `<brewhouse-status></brewhouse-status>`;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    })

    describe('currentStatusText', function () {
      it('is offline at 0', function () {
        const want = 'System is currently offline.';
        const got = isolatedScope.currentStatusText(0);
        expect(got).toBe(want);
      });
    });

    describe('nextStatusText', function() {
      it('is heating water at 0', function() {
        const want = 'Heating water for strike.';
        const got = isolatedScope.nextStatusText(0);
        expect(got).toBe(want);
      });

      it('is nothing at max', function() {
        const want = '';
        const got = isolatedScope.nextStatusText(13);
        expect(got).toBe(want);
      });
    });

    describe('adjustState', function() {
      it('grantsPermission if permission is requested', function () {
        isolatedScope.requestPermission.latest = true;
        isolatedScope.grantPermission.latest = false;
        // currentStatus will be modified by the server when granting
        // permission, so make sure we aren't adjusting it in tests.
        isolatedScope.currentStatus.latest = 0;
        isolatedScope.adjustState(+1);
        expect(isolatedScope.grantPermission.latest).toBe(true);
        expect(isolatedScope.currentStatus.latest).toBe(0);
      });

      it('adjusts state if permission is requested but by more than 1',
          function () {
        isolatedScope.requestPermission.latest = true;
        isolatedScope.grantPermission.latest = false;
        isolatedScope.currentStatus.latest = 0;
        isolatedScope.adjustState(+2);
        expect(isolatedScope.grantPermission.latest).toBe(false);
        expect(isolatedScope.currentStatus.latest).toBe(2);
      });

      it('adjusts state if permission is not and adjusted by 1', function () {
        isolatedScope.requestPermission.latest = false;
        isolatedScope.currentStatus.latest = 0;
        isolatedScope.adjustState(+1);
        expect(isolatedScope.currentStatus.latest).toBe(1);
      });
    });

    describe('updateStateColor', function () {
      it('shows green (success) when permission is not requested', function () {
        isolatedScope.requestPermission.latest = false;
        expect(element[0].querySelector('.next-state-button').classList)
            .toContain('btn-success');
        $interval.flush(501.0);
        scope.$digest();
        expect(element[0].querySelector('.next-state-button').classList)
            .toContain('btn-success');
        $interval.flush(501.0);
        scope.$digest();
        expect(element[0].querySelector('.next-state-button').classList)
            .toContain('btn-success');
      });

      it('shows toggles color when permission is requested', function () {
        isolatedScope.requestPermission.latest = true;
        expect(element[0].querySelector('.next-state-button').classList)
            .toContain('btn-success');
        $interval.flush(501.0);
        scope.$digest();
        expect(element[0].querySelector('.next-state-button').classList)
            .toContain('btn-danger');
        $interval.flush(501.0);
        scope.$digest();
        expect(element[0].querySelector('.next-state-button').classList)
            .toContain('btn-success');
      });
    });

    describe('template binding', function () {
      it('shows current status text', function () {
        isolatedScope.currentStatus.latest = 0;
        scope.$digest();
        
        expect(element.find('header').html()).toContain(
          'System is currently offline.');
        expect(element.find('header').html()).toContain('(Status #0)');
      });

      it('shows next status text', function() {
        isolatedScope.currentStatus.latest = 0;
        scope.$digest();

        expect(element[0].querySelector('.next-status-text p').innerHTML)
            .toBe('Next: Heating water for strike.');
      });

      it('shows timer', function () {
        isolatedScope.timer.latest = 30.0;
        scope.$digest();

        expect(element[0].querySelector('.timer').innerHTML)
            .toContain('Time Left: 00:30');
      });

      describe('clicking previous', function () {
        it ('should regress the state', function () {
          isolatedScope.currentStatus.latest = 1;
          element[0].querySelector('.previous-state-button').click();
          expect(isolatedScope.currentStatus.latest).toBe(0);
        });
      });

      describe('clicking next', function () {
        it ('should advance the state', function () {
          isolatedScope.currentStatus.latest = 0;
          element[0].querySelector('.next-state-button').click();
          expect(isolatedScope.currentStatus.latest).toBe(1);
        });
      });
    });
  });

});