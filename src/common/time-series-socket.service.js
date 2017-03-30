(function loadTimeSeriesSocketService() {
  angular
    .module('app.common')
    .service('timeSeriesSocket', timeSeriesSocket);

  timeSeriesSocket.$inject = ['$websocket', '$http'];

  function timeSeriesSocket($websocket, $http) {
    const self = this;

    self.socket = $websocket(
        `ws://${window.location.host}/live/timeseries/socket/`,
        { reconnectIfNotNormalClose: true });

    self.socket.onMessage(onSocketMessage);
    self.socket.onClose(onSocketClose);
    self.sensorToSubscribers = {};
    self.subscribe = subscribe;

    // Makes sure snackbar is ready to be added on connection closing.
    $.snackbar('init');

    // TODO(will): These should not be set once the websocket-mock library
    // supports sending data to consumers and closing the socket.
    self.onSocketMessage = onSocketMessage;
    self.onSocketClose = onSocketClose;

    /**
     * Callback handling incoming messages from websocket. Adds data to the
     * data array for the sensor associated with the incoming message. If the
     * sensor has any subscribers with callbacks registered, calls it.
     * @param {string} msg Unparsed message from received from websocket.
     */
    function onSocketMessage(msg) {
      const parsed = JSON.parse(msg.data);
      const subscribers = self.sensorToSubscribers[parsed.sensor];
      _.each(subscribers, function updateSubscriber(subscriber) {
        subscriber.newData([parsed]);
        if (subscriber.callback) {
          subscriber.callback();
        }
      });
    }

    /**
     * Callback handling the closing of the websocket. Adds snackbar indicating
     * the websocket closed unexpectedly.
     */
    function onSocketClose() {
      $.snackbar('add', {
        type: 'danger',
        msg: 'Connection lost to server. Reestablishing connection.',
        buttonText: 'Close',
      });
    }

    /**
     * Entry point for subscriptions to initiate the subscription. Identifies
     * the sensor being subscribed to over http request, then sends a subscribe
     * request over the websocket, which will register it to receive updates
     * when that sensor time series is changed on the server. If a callback is
     * provided, registers it to be called when the subscriber receives updates.
     * @param {object}   subscriber Details about the sensor to subscribe to
     *                              updates on the server. Contains recipe
     *                              instance and sensor name.
     * @param {function} callback   Function to call when the subscriber
     *                              recieves updates.
     */
    function subscribe(subscriber, callback) {
      const data = {
        recipe_instance: subscriber.recipeInstance,
        name: subscriber.name,
      };

      $http.post('live/timeseries/identify/', data)
        .then(response => handleIdentification(subscriber, callback, response));
    }

    /**
     * Handles response from identification endpoint, by registering the
     * subscription internally, and sending the subscription request over the
     * websocket.
     * @param {object}   subscriber Details about the sensor to subscribe to
     *                              updates on the server. Contains recipe
     *                              instance and sensor name.
     * @param {function} callback   Function to call when the subscriber
     *                              recieves updates.
     * @param {object}   response   The response from the http request to
     *                              identify the sensor.
     */
    function handleIdentification(subscriber, callback, response) {
      // Extend the provided subscriber with extra information.
      subscriber.sensor = response.data.sensor;
      subscriber.callback = callback;

      // Register subscriber with tracking arrays and maps.
      if (!self.sensorToSubscribers.hasOwnProperty(subscriber.sensor)) {
        self.sensorToSubscribers[subscriber.sensor] = [];
      }
      self.sensorToSubscribers[subscriber.sensor].push(subscriber);

      // Send subscription request to server.
      const message = JSON.stringify({
        recipe_instance: subscriber.recipeInstance,
        sensor: subscriber.sensor,
        subscribe: true,
      });
      self.socket.send(message);
    }
  }
}());
