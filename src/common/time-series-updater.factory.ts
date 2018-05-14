import moment = require('moment');

TimeSeriesUpdaterFactory.$inject = ['timeSeriesSocket', 'breweryResources'];

export function TimeSeriesUpdaterFactory(timeSeriesSocket, breweryResources) {
  /**
   * Creates an instance of TimeSeriesUpdater
   *
   * @constructor
   * @this {TimeSeriesUpdater}
   *
   * @param {Number} recipeInstance The identifier for the RecipeInstance this
   *                                time series is related to.
   * @param {String} name           The programmatic sensor/variable name for
   *                                the brewing equipment to monitor.
   * @param {String} variableType   The sub-sensor variable type for name.
   *                                E.g. 'value' or 'override'.
   * @param {Number} historicalTime The amount of historical data desired to
   *                                be queried on subscription and then
   *                                trimmed to as new data is made available.
   *                                Units: seconds. Negative values indicate
   *                                time in the past.
   */
  function TimeSeriesUpdater(
      recipeInstance, name, variableType, historicalTime) {
    const self = this;

    self.recipeInstance = recipeInstance;
    self.name = name;
    self.variableType = variableType;
    self.historicalTime = historicalTime;

    self.dataPoints = [];
    self.latest = null;

    self.timeSeriesSocket = timeSeriesSocket;
    self.timeSeriesSocket.subscribe(self, null, self.historicalTime);
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

    // Ignore datapoints received older than kStaleDataMinutes.
    while (samples.length && self.historicalTime &&
        diffSecondsFromNow(samples[0].time) < self.historicalTime) {
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
    while (self.dataPoints.length && self.historicalTime &&
        diffSecondsFromNow(self.dataPoints[0][0]) < self.historicalTime) {
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
   * seconds.
   *
   * @param {Object} dateTime A moment() date time to compare to now.
   * @returns {Number} The difference in time from dateTime until now in
   *                   seconds. Larger, more positive numbers represent a
   *                   dateTime further in the future.
   */
   // TODO(will): Separate this out into an independent service.
  function diffSecondsFromNow(dateTime) {
    const timeDiff = moment(dateTime).diff(moment());
    const timeDiffSeconds = moment.duration(timeDiff).asSeconds();
    return timeDiffSeconds;
  }

  return TimeSeriesUpdater;
}
