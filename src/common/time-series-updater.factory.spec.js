/* eslint-disable */
describe('app.common time-series-socket.service', function () {
  beforeEach(module('app.common'));
  beforeEach(module('joulia.templates'));
  beforeEach(module(function($provide) {
    $provide.service('timeSeriesSocket', function () {
      this.subscribe = jasmine.createSpy('subscribe');
    });
  }));

  var $window, $controller, $httpBackend, $rootScope, $location;

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('TimeSeriesUpdater factory', function () {
    var TimeSeriesUpdater;

    const recipeInstance = 0;
    const sensorName = '';
    const twentyMinutesAgo = 20;

    beforeEach(inject(function (_TimeSeriesUpdater_) {
      TimeSeriesUpdater = _TimeSeriesUpdater_;
    }));

    it('should construct a new defined updater', function () {
      const recipeInstance = 1;
      const name = "foo";
      const timeSeriesUpdater = new TimeSeriesUpdater(
        recipeInstance, name, 'value');
      expect(timeSeriesUpdater).toBeDefined();
    });

    describe('newData', function () {
      /**
       * Compares two dataPoint arrays, since moment's cannot be compared with
       * equality and instead need to be compared with isSame.
       */
       // TODO(will): Make into a custom Jasmine matcher.
      function compareSamples(samples1, samples2) {
        return _.reduce(_.zip(samples1, samples2), function (memo, pair) {
          return memo && pair[0][0].isSame(pair[1][0]) && pair[0][1] == pair[1][1];
        }, true);
      }

      it('adds new data points', function () {
        const time1 = moment();
        const time2 = moment();
        const samples = [
          {sensor: 12, time: time1.toISOString(), value: 10.0},
          {sensor: 12, time: time2.toISOString(), value: 11.0},
        ];
        const timeSeriesUpdater = new TimeSeriesUpdater();
        timeSeriesUpdater.newData(samples);
        expect(time1.toDate()).toEqual(moment(time1.toISOString()).toDate());
        const want = [
          [time1, 10.0],
          [time2, 11.0],
        ];
        expect(compareSamples(timeSeriesUpdater.dataPoints, want)).toBeTruthy();
      });

      it('ignores old samples provided', function () {
        const time1 = new moment().subtract(21, 'minutes');
        const time2 = new moment();
        const samples = [
          {sensor: 12, time: time1.toISOString(), value: 10.0},
          {sensor: 12, time: time2.toISOString(), value: 11.0},
        ];
        const timeSeriesUpdater = new TimeSeriesUpdater(
          recipeInstance, sensorName, 'value', twentyMinutesAgo);
        timeSeriesUpdater.newData(samples);
        const want = [
          [time2, 11.0],
        ];
        expect(compareSamples(timeSeriesUpdater.dataPoints, want)).toBeTruthy();
      });

      it('removes existing old samples', function () {
        const timeSeriesUpdater = new TimeSeriesUpdater(
          recipeInstance, sensorName, 'value', twentyMinutesAgo);
        const time1 = new moment().subtract(21, 'minutes');
        const time2 = new moment();
        timeSeriesUpdater.dataPoints = [
          [time1, 10.0],
          [time2, 11.0],
        ]
        const time3 = new moment();
        const time4 = new moment();
        const samples = [
          {sensor: 12, time: time3.toISOString(), value: 12.0},
          {sensor: 12, time: time4.toISOString(), value: 13.0},
        ];
        timeSeriesUpdater.newData(samples);
        const want = [
          [time2, 11.0],
          [time3, 12.0],
          [time4, 13.0],
        ];
        expect(compareSamples(timeSeriesUpdater.dataPoints, want)).toBeTruthy();
      });

      it('leaves data without time', function () {
        const timeSeriesUpdater = new TimeSeriesUpdater(
          recipeInstance, sensorName, 'value');
        const time1 = new moment().subtract(21, 'minutes');
        const time2 = new moment();
        timeSeriesUpdater.dataPoints = [
          [time1, 10.0],
          [time2, 11.0],
        ]
        const time3 = new moment();
        const time4 = new moment();
        const samples = [
          {sensor: 12, time: time3.toISOString(), value: 12.0},
          {sensor: 12, time: time4.toISOString(), value: 13.0},
        ];
        timeSeriesUpdater.newData(samples);
        const want = [
          [time1, 10.0],
          [time2, 11.0],
          [time3, 12.0],
          [time4, 13.0],
        ];
        expect(compareSamples(timeSeriesUpdater.dataPoints, want)).toBeTruthy();
      });
    });

    describe('set', function () {
      it('sends a new data point to the server', function () {
        $httpBackend.when('POST', '/live/timeseries/new')
            .respond();
        const timeSeriesUpdater = new TimeSeriesUpdater(1, "foo", 'value');
        timeSeriesUpdater.sensor = 2;

        const time = moment().toISOString();
        timeSeriesUpdater.getTime = function () {
          return time;
        }

        $httpBackend.expectPOST('/live/timeseries/new', {
          recipe_instance: 1,
          sensor: 2,
          value: 12.0,
          time: time,
        });

        timeSeriesUpdater.set(12.0);
        $httpBackend.flush();
      });
    });
  });

});