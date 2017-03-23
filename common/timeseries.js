define(['angularAMD','moment','underscore'],function(angularAMD,moment,_){
	angularAMD
	.service('timeSeriesSocket',['$timeout','$http',function($timeout,$http){
		var self = this;
		
		//message queue lets us queue up items while the socket is not currently open
		this._msgqueue = [];
		this._flushqueue = function(){
			for (msg in self._msgqueue){
				self._socket.send(JSON.stringify(self._msgqueue[msg]))
			} 
			self._msgqueue = []; 
		}
		
		//handle the fundamentals of creating and managing the websocket
		this._isopen=false;		
		self._socket = new WebSocket("ws://"+window.location.host+"/live/timeseries/socket/");
		if (self._isopen) self._flushqueue();
		
		self._socket.onopen = function(){
			self._isopen = true; 
			self._flushqueue();
		};
		self._socket.onmessage = function(msg){
			var parsed = JSON.parse(msg.data);
			_.each(_.where(self._subscribers,{sensor:parsed.sensor}),function(subscriber){
				subscriber.subscriber.newData([parsed]);
				if (subscriber.hasOwnProperty('callback')){ subscriber.callback() };
			});
		};
		self._socket.onclose = function(){
			self._isopen=false;
	  		$.snackbar("add",{
				type: 		"danger",
				msg: 		"Connection lost. Reestablishing connection.",
				buttonText: "Close",
			});
		};
		

		//entry point for subscriptions to initiate the subscription
		this._subscribers = [];
		this.subscribe = function(subscriber,callback){
			$http.post( "live/timeseries/identify/",{recipe_instance:subscriber.recipe_instance,name:subscriber.name}).then( function( response ) {
				var data = response.data;
				subscriber.sensor = data.sensor;
				var new_subscriber_obj = {sensor:subscriber.sensor,subscriber:subscriber};
				if (callback){new_subscriber_obj.callback=callback};
				self._subscribers.push(new_subscriber_obj);
				self._msgqueue.push({
					recipe_instance: subscriber.recipe_instance,
					sensor: subscriber.sensor,
					subscribe: true
				});
				if (self._isopen) self._flushqueue();
			});
		};
		
		//TODO: add websocket sending of data
		/*this.send = function(subscriber,value){}*/
	}])
	.factory('timeSeriesUpdater',['timeSeriesSocket','$http',function(timeSeriesSocket,$http){
		var service = function(recipe_instance,name,callback){
			this.recipe_instance = recipe_instance;
			this.name = name;
			
			this.errorSleepTime = 500;
			this.cursor = null;
			
			this.dataPoints = [];
			this.latest = null;
			
			var self = this;
			this.timeSeriesSocket = timeSeriesSocket;
			this.timeSeriesSocket.subscribe(self,callback);
		}
	
		service.prototype.newData = function(dataPointsIn) {
		    var staleDataMinutes = 20.;
			
			for (var i = 0; i < dataPointsIn.length; i++) {
		    	var timeDiff = moment().diff(moment(dataPointsIn[i].time));
		    	var timeDiffMinutes = moment.duration(timeDiff).asMinutes();
		    	if (timeDiffMinutes < staleDataMinutes){
		    		var dataPoint = dataPointsIn[i];
		    		this.dataPoints.push([new Date(dataPoint.time),parseFloat(dataPoint.value)]);
		    		this.latest = JSON.parse(dataPoint.value);//parseFloat(dataPoint.value);
		    	}
		    }
		    
		    //remove any data older than 20min
		    while (this.dataPoints.length > 0){
		    	var timeDiff = moment().diff(moment(this.dataPoints[0][0]));
		    	var timeDiffMinutes = moment.duration(timeDiff).asMinutes();
		    	if (timeDiffMinutes > staleDataMinutes)
		    		this.dataPoints.shift();
		    	else
		    		break;
		    }
		    
		};
		
		service.prototype.set = function(value){
			var now = moment().toISOString();
			$http.post("/live/timeseries/new/",{
	    			recipe_instance: this.recipe_instance,
	    			sensor: this.sensor,
	    			value: value,
	    			time: now,
	    		}
	    	);
		};
	    
	    return service;
	}]);
});