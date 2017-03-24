angular
  .module('app.common')
  .service('timeSeriesSocket', ['$timeout', '$http', timeSeriesSocket]);

function timeSeriesSocket($timeout, $http) {
  var self = this;

  // Message queue lets us queue up items while the socket is not currently
  // open.
  this._msgqueue = [];
  this._flushqueue = function() {
    for (var msg in self._msgqueue) {
      self._socket.send(JSON.stringify(self._msgqueue[msg]));
    } 
    self._msgqueue = []; 
  };

  // Handle the fundamentals of creating and managing the websocket.
  this._isopen = false;
  self._socket = new WebSocket("ws://" + window.location.host + "/live/timeseries/socket/");
  if (self._isopen) {
    self._flushqueue();
  } 

  self._socket.onopen = function() {
    self._isopen = true; 
    self._flushqueue();
  };

  self._socket.onmessage = function(msg){
    var parsed = JSON.parse(msg.data);
    _.each(_.where(self._subscribers,{sensor:parsed.sensor}),function(subscriber) {
      subscriber.subscriber.newData([parsed]);
      if (subscriber.hasOwnProperty('callback')) {
        subscriber.callback();
      }
    });
  };

  self._socket.onclose = function() {
    self._isopen = false;
    $.snackbar("add", {
      type: "danger",
      msg: "Connection lost. Reestablishing connection.",
      buttonText: "Close",
    });
  };

  // Entry point for subscriptions to initiate the subscription.
  this._subscribers = [];
  this.subscribe = function(subscriber,callback) {
    var data = {
      recipe_instance: subscriber.recipe_instance,
      name: subscriber.name
    };

    function handleIdentification(response) {
      var data = response.data;
      subscriber.sensor = data.sensor;
      var new_subscriber_obj = {sensor:subscriber.sensor,subscriber:subscriber};
      if (callback) {
        new_subscriber_obj.callback = callback;
      }
      self._subscribers.push(new_subscriber_obj);
      self._msgqueue.push({
        recipe_instance: subscriber.recipe_instance,
        sensor: subscriber.sensor,
        subscribe: true
      });
      if (self._isopen) {
        self._flushqueue();
      }
    }

    $http.post("live/timeseries/identify/", data)
      .then(handleIdentification);
  };

  //TODO(will): add websocket sending of data
  /*this.send = function(subscriber,value){}*/
}
