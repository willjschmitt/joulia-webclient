/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';
import 'angular-websocket';
import 'angular-websocket/dist/angular-websocket-mock';

import _ = require('underscore');

import './time-series-socket.service';

describe('app.common time-series-socket.service', function () {
  beforeEach(angular.mock.module('app.common.time-series-socket'));
  beforeEach(angular.mock.module('ngWebSocket', 'ngWebSocketMock'));

  var $window, $controller, $httpBackend, $websocketBackend, $rootScope,
      $location;

  beforeEach(inject(function ($injector) {
    $window = $injector.get('$window');
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $websocketBackend = $injector.get('$websocketBackend');
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');

    $websocketBackend.mock();
    $websocketBackend.expectConnect(
      `ws://${window.location.host}/live/timeseries/socket/`);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();

    $websocketBackend.flush();
    $websocketBackend.verifyNoOutstandingExpectation();
    $websocketBackend.verifyNoOutstandingRequest();
  });

  describe('timeSeriesSocket service', function () {
    var timeSeriesSocket;
    function Subscriber (recipeInstance, name, callback) {
      const self = this;
      self.recipeInstance = recipeInstance;
      self.name = name;
      self.callback = callback;
      self.recievedData = [];
      self.newData = function newData(samples){
        _.each(samples, function (sample) {
          self.recievedData.push(sample)
        });
      };
    };

    beforeEach(inject(function (_timeSeriesSocket_) {
      timeSeriesSocket = _timeSeriesSocket_;
    }));

    it('should be defined', function() {
      expect(timeSeriesSocket).toBeDefined();
    });

    describe('onSocketMessage', function () {
      it('should add new data to subscriber', function () {
        const subscriber = new Subscriber(0, "foo");
        timeSeriesSocket.sensorToSubscribers[12] = [subscriber];
        timeSeriesSocket.onSocketMessage({
          data: '{"headers":["sensor","time","value"],"data":[[12,1000,123.0]]}'
        });

        expect(subscriber.recievedData).toEqual([{
          sensor: 12,
          time: 1000,
          value: 123.0,
        }]);
      });

      it('should call callback', function () {
        const self = this;
        self.calls = 0;
        // TODO(will): Make this a spy instead of a closure.
        function callback () {
          self.calls += 1;
        }
        const subscriber = new Subscriber(0, "foo", callback);
        timeSeriesSocket.sensorToSubscribers[12] = [subscriber];
        timeSeriesSocket.onSocketMessage({
          data: '{"headers":["sensor","time","value"],"data":[[12,1000,123.0]]}'
        });

        expect(self.calls).toBe(1);
      });
    });

    describe('onSocketOpen', function () {
      beforeEach(function () {
        $httpBackend.when('POST', 'live/timeseries/identify/')
          .respond({ sensor: 12 });
      });

      it('should resubscribe to already subscribed', function () {
        // Original subscription.
        $httpBackend.expectPOST('live/timeseries/identify/');
        $websocketBackend.expectSend(JSON.stringify({
          recipe_instance: 0,
          sensor: 12,
          subscribe: true,
        }));
        const subscriber = new Subscriber(0, 'foo');
        timeSeriesSocket.subscribe(subscriber);
        $httpBackend.flush();

        // Simulate reconnection.
        $websocketBackend.expectSend(JSON.stringify({
          recipe_instance: 0,
          sensor: 12,
          subscribe: true,
        }));
        timeSeriesSocket.onSocketOpen();
      });
    });

    describe('onSocketClose', function () {
      // TODO(will): Add tests that actually check for snackbars added.

      it ('succeeds', function () {
        timeSeriesSocket.onSocketClose();
      });
    });

    describe('subscribe', function () {
      var identifyPost;

      beforeEach(function () {
        identifyPost = $httpBackend.when('POST', 'live/timeseries/identify/')
          .respond({ sensor: 12 });
      });

      it('should call identify', function () {
        $httpBackend.expectPOST('live/timeseries/identify/');
        const subscriber = new Subscriber(0, 'foo');
        timeSeriesSocket.subscribe(subscriber);
        $httpBackend.flush();
      });

      describe('calling handleIdentification on callback', function () {
        it('should add subscriber to new array', function () {
          expect(timeSeriesSocket.sensorToSubscribers).toEqual({});

          $httpBackend.expectPOST('live/timeseries/identify/');
          const subscriber = new Subscriber(0, 'foo');
          timeSeriesSocket.subscribe(subscriber);
          $httpBackend.flush();

          const want = {
            12: [subscriber],
          };
          expect(timeSeriesSocket.sensorToSubscribers).toEqual(want);
        });

        it('should add subscriber to existing array', function () {
          expect(timeSeriesSocket.sensorToSubscribers).toEqual({});

          $httpBackend.expectPOST('live/timeseries/identify/');
          $websocketBackend.expectSend(JSON.stringify({
            recipe_instance: 0,
            sensor: 12,
            subscribe: true,
          }));
          const subscriber1 = new Subscriber(0, 'foo');
          timeSeriesSocket.subscribe(subscriber1);
          $httpBackend.flush();

          $httpBackend.expectPOST('live/timeseries/identify/');
          const subscriber2 = new Subscriber(0, 'foo');
          timeSeriesSocket.subscribe(subscriber2);
          $httpBackend.flush();

          const want = {
            12: [subscriber1, subscriber2],
          };
          expect(timeSeriesSocket.sensorToSubscribers).toEqual(want);
        });

        it('should send subscription request on socket', function () {
          $httpBackend.expectPOST('live/timeseries/identify/');
          $websocketBackend.expectSend(JSON.stringify({
            recipe_instance: 0,
            sensor: 12,
            subscribe: true,
          }));
          const subscriber = new Subscriber(0, 'foo');
          timeSeriesSocket.subscribe(subscriber);
          $httpBackend.flush();
        });

        it('should send subscription request with time filter', function () {
          $httpBackend.expectPOST('live/timeseries/identify/');
          $websocketBackend.expectSend(JSON.stringify({
            recipe_instance: 0,
            sensor: 12,
            subscribe: true,
            history_time: -15,
          }));
          const subscriber = new Subscriber(0, 'foo');
          timeSeriesSocket.subscribe(subscriber, null, -15);
          $httpBackend.flush();
        });
      });
    });

  });
});
