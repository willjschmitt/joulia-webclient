app
  .module('app.common')
  .factory('timeSeriesUpdater', ['timeSeriesSocket', '$http', timeSeriesUpdater]);

function timeSeriesUpdater(timeSeriesSocket, $http) {
  var service = function(recipe_instance, name, callback) {
    this.recipe_instance = recipe_instance;
    this.name = name;

    this.errorSleepTime = 500;
    this.cursor = null;

    this.dataPoints = [];
    this.latest = null;

    var self = this;
    this.timeSeriesSocket = timeSeriesSocket;
    this.timeSeriesSocket.subscribe(self, callback);
  }

  service.prototype.newData = function(dataPointsIn) {
    var staleDataMinutes = 20.;

    for (var i = 0; i < dataPointsIn.length; i++) {
      var timeDiff = moment().diff(moment(dataPointsIn[i].time));
      var timeDiffMinutes = moment.duration(timeDiff).asMinutes();
      if (timeDiffMinutes < staleDataMinutes) {
        var dataPoint = dataPointsIn[i];
        var newDataPoint = [new Date(dataPoint.time), parseFloat(dataPoint.value)];
        this.dataPoints.push(newDataPoint);
        this.latest = JSON.parse(dataPoint.value);
      }
    }

    // Remove any data older than 20min.
    while (this.dataPoints.length > 0) {
      var timeDiff = moment().diff(moment(this.dataPoints[0][0]));
      var timeDiffMinutes = moment.duration(timeDiff).asMinutes();
      if (timeDiffMinutes > staleDataMinutes) {
        this.dataPoints.shift();
      } else {
        break;
      }
    }

    service.prototype.set = function(value) {
      var now = moment().toISOString();
      $http.post("/live/timeseries/new/", {
        recipe_instance: this.recipe_instance,
        sensor: this.sensor,
        value: value,
        time: now,
      });
    };
      
    return service;
  }
}
