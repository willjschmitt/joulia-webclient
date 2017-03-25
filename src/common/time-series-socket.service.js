angular
  .module('app.common')
  .service('timeSeriesSocket', timeSeriesSocket);

timeSeriesSocket.$inject = ['$timeout', '$http'];

function timeSeriesSocket($timeout, $http) {
  const self = this;

  // Message queue lets us queue up items while the socket is not currently
  // open.
  this.messageQueue = [];
  function flushQueue() {
    for (const msg in self.messageQueue) {
      self.socket.send(JSON.stringify(self.messageQueue[msg]));
    }
    self.messageQueue = [];
  }

  // Handle the fundamentals of creating and managing the websocket.
  this.socketOpen = false;
  this.socket = new WebSocket(
      `ws://${window.location.host}/live/timeseries/socket/`);
  if (self.socketOpen) {
    flushQueue();
  }

  this.socket.onopen = onSocketOpen;
  this.socket.onmessage = onSocketMessage;
  this.socket.onclose = onSocketClose;
  this.subscribers = [];
  this.subscribe = subscribe;

  function onSocketOpen() {
    self.socketOpen = true;
    flushQueue();
  }

  function onSocketMessage(msg) {
    const parsed = JSON.parse(msg.data);
    const matchingSubscribers = _.where(self.subscribers, { sensor: parsed.sensor });
    _.each(matchingSubscribers, function updateSubscriber(subscriber) {
      subscriber.subscriber.newData([parsed]);
      if (subscriber.hasOwnProperty('callback')) {
        subscriber.callback();
      }
    });
  }

  function onSocketClose() {
    self.socketOpen = false;
    $.snackbar('add', {
      type: 'danger',
      msg: 'Connection lost. Reestablishing connection.',
      buttonText: 'Close',
    });
  }

  // Entry point for subscriptions to initiate the subscription.
  function subscribe(subscriber, callback) {
    const data = {
      recipe_instance: subscriber.recipe_instance,
      name: subscriber.name,
    };

    function handleIdentification(response) {
      subscriber.sensor = response.data.sensor;
      const newSubscriber = {
        sensor: subscriber.sensor,
        subscriber: subscriber,
      };
      if (callback) {
        newSubscriber.callback = callback;
      }
      self.subscribers.push(newSubscriber);
      self.messageQueue.push({
        recipe_instance: subscriber.recipe_instance,
        sensor: subscriber.sensor,
        subscribe: true,
      });
      if (self.socketOpen) {
        flushQueue();
      }
    }

    $http.post('live/timeseries/identify/', data)
      .then(handleIdentification);
  }
}
