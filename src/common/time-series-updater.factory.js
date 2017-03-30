(function loadTimeSeriesUpdaterFactory() {
  angular
    .module('app.common')
    .factory('TimeSeriesUpdater', TimeSeriesUpdaterFactory);

  TimeSeriesUpdaterFactory.$inject = ['timeSeriesSocket', 'breweryResources'];

  function TimeSeriesUpdaterFactory(timeSeriesSocket, breweryResources) {
    /**
     * Creates an instance of TimeSeriesUpdater
     *
     * @constructor
     * @this {TimeSeriesUpdater}
     */
    function TimeSeriesUpdater(recipeInstance, name) {
      const self = this;

      self.recipeInstance = recipeInstance;
      self.name = name;

      self.dataPoints = [];
      self.latest = null;

      self.timeSeriesSocket = timeSeriesSocket;
      self.timeSeriesSocket.subscribe(self);
    }

    TimeSeriesUpdater.prototype.newData = newData;
    TimeSeriesUpdater.prototype.set = set;
    TimeSeriesUpdater.prototype.getTime = getTime;

    /**
     * Adds new dataPoints to the dataPoints array as time, value pairs.
     *
     * @param {Object[]} samples Array of data points from websocket stream
     *                           containing, sensor, time, and value data.
     */
    function newData(samples) {
      const self = this;
      const kStaleDataMinutes = 20.0;

      // Ignore datapoints received older than kStaleDataMinutes.
      while (samples.length &&
          diffMinutesFromNow(samples[0].time) > kStaleDataMinutes) {
        samples.shift();
      }

      // Add the valid new data to the internal dataPoints array.
      _.each(samples, function addSample(sample) {
        const newDataPoint = [
          moment(sample.time),
          sample.value,
        ];
        self.dataPoints.push(newDataPoint);
        self.latest = sample.value;
      });

      // Remove any internal data older than kStaleDataMinutes.
      while (self.dataPoints.length &&
          diffMinutesFromNow(self.dataPoints[0][0]) > kStaleDataMinutes) {
        self.dataPoints.shift();
      }
    }

    /**
     * Sets the value for the data stream and sends it to the server.
     *
     * @param {Number}   value    The value to update the sensor stream with.
     * @param {function} callback A function to call after the value is
     *                            successfully updated on the server.
     */
    function set(value, callback) {
      const self = this;
      const data = {
        recipe_instance: self.recipeInstance,
        sensor: self.sensor,
        value: value,
        time: self.getTime(),
      };
      const newDataPoint = new breweryResources.TimeSeriesDataPoint(data);
      newDataPoint.$save(function callbackIfExists() {
        if (callback) {
          callback();
        }
      });
    }

    /**
     * Internal function for getting current time. Set to allow stubbing out
     * timer.
     */
    // TODO(will): Stub out into it's own service, which can be provided for in
    // tests.
    function getTime() {
      return moment().toISOString();
    }

    /**
     * Calculates the time difference of the provided date time from now in
     * minutes.
     *
     * @param {Object} dateTime A moment() date time to compare to now.
     * @returns {Number} The difference in time from dateTime until now in
     *                   minutes. Larger, more positive numbers represent a
     *                   dateTime further in the past.
     */
     // TODO(will): Separate this out into an independent service.
    function diffMinutesFromNow(dateTime) {
      const timeDiff = moment().diff(moment(dateTime));
      const timeDiffMinutes = moment.duration(timeDiff).asMinutes();
      return timeDiffMinutes;
    }

    return TimeSeriesUpdater;
  }
}());
