(function loadTimeSeriesUpdaterFactory() {
  angular
    .module('app.common')
    .factory('TimeSeriesUpdater', ['timeSeriesSocket', '$http', TimeSeriesUpdater]);

  function TimeSeriesUpdater(timeSeriesSocket, $http) {
    const service = function service(recipeInstance, name, callback) {
      const self = this;

      this.recipeInstance = recipeInstance;
      this.name = name;

      this.errorSleepTime = 500;
      this.cursor = null;

      this.dataPoints = [];
      this.latest = null;

      this.timeSeriesSocket = timeSeriesSocket;
      this.timeSeriesSocket.subscribe(self, callback);
    };

    service.prototype.newData = newData;
    service.prototype.set = set;

    function newData(dataPointsIn) {
      const staleDataMinutes = 20.0;

      for (let i = 0; i < dataPointsIn.length; i += 1) {
        const timeDiff = moment().diff(moment(dataPointsIn[i].time));
        const timeDiffMinutes = moment.duration(timeDiff).asMinutes();
        if (timeDiffMinutes < staleDataMinutes) {
          const dataPoint = dataPointsIn[i];
          const newDataPoint = [new Date(dataPoint.time), parseFloat(dataPoint.value)];
          this.dataPoints.push(newDataPoint);
          this.latest = JSON.parse(dataPoint.value);
        }
      }

      // Remove any data older than 20min.
      while (this.dataPoints.length > 0) {
        const timeDiff = moment().diff(moment(this.dataPoints[0][0]));
        const timeDiffMinutes = moment.duration(timeDiff).asMinutes();
        if (timeDiffMinutes > staleDataMinutes) {
          this.dataPoints.shift();
        } else {
          break;
        }
      }
    }

    function set(value) {
      const now = moment().toISOString();
      $http.post('/live/timeseries/new/', {
        recipe_instance: this.recipe_instance,
        sensor: this.sensor,
        value: value,
        time: now,
      });
    }

    return service;
  }
}());
