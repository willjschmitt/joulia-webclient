define(['angularAMD','underscore','jquery','moment',
           "prettify","perfect-scrollbar","icheck","bootstrap-select",
           "datatables.net","jquery_fullscreen",
           "moment",
           "nvd3",
           
           "snackbar","toasts",
           
           "bemat-common",
           
           "jquery-ui","bootstrap","modernizr",
           
           'timeseries',"toggleable-element",'value-card','dial',
           
           'brewery-api',
    ],function(app,_,$,moment){
	app
	.controller('breweryController',['$scope','$timeout','$interval',
	                                 'timeSeriesUpdater','breweryApi',
	                                 '$routeParams','$uibModal','$http',
	                                 function($scope,$timeout,$interval,
	                                		 timeSeriesUpdater,breweryApi,
	                                		 $routeParams,$uibModal,$http){		
		$scope.brewery = breweryApi.brewery.get({id:$routeParams.breweryId},getRecipeInstance);
		
		function getRecipeInstance (){
			breweryApi.recipeInstance.query({
				brewery:$scope.brewery.id,
				active:'True',
			},function(result){
				if (result.length == 1){
					$scope.recipeInstance = result[0];
					initializeBrewery();
				}
				else
					$scope.recipeInstance = null;
			},function(){$scope.recipeInstance = null;});
		}
		
		function initializeBrewery(){
			//first set up a brew session end function
			$scope.end_recipe = function(){
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: 'static/brewery/html/end-recipe-modal.html',
					controller: 'endRecipeModalCtrl'
				});

				modalInstance.result.then(function (result) {
					$http({
						method: 'POST',
						url: '/brewery/end',
						data:{recipe_instance:$scope.recipeInstance.id}
					}).then(function() {
						$scope.recipeInstance = null;
					});
				});
			};
			
			
			//subscribe to all the time series
			$scope.boilTemperatureActual = new timeSeriesUpdater($scope.recipeInstance.id,'boilKettle__temperature');
			$scope.boilTemperatureSetPoint = new timeSeriesUpdater($scope.recipeInstance.id,'boilKettle__temperatureSetPoint');
			$scope.mashTemperatureActual = new timeSeriesUpdater($scope.recipeInstance.id,'mashTun__temperature');
			$scope.mashTemperatureSetPoint = new timeSeriesUpdater($scope.recipeInstance.id,'mashTun__temperatureSetPoint');
			$scope.boilKettleDutyCycle = new timeSeriesUpdater($scope.recipeInstance.id,'boilKettle__dutyCycle');
			$scope.boilKettlePower = new timeSeriesUpdater($scope.recipeInstance.id,'boilKettle__power');
			$scope.systemEnergy = new timeSeriesUpdater($scope.recipeInstance.id,'systemEnergy');
			$scope.systemEnergyCost = new timeSeriesUpdater($scope.recipeInstance.id,'systemEnergyCost');
			$scope.currentStatus = new timeSeriesUpdater($scope.recipeInstance.id,'state');
			$scope.timer = new timeSeriesUpdater($scope.recipeInstance.id,'timer');
			$scope.requestPermission = new timeSeriesUpdater($scope.recipeInstance.id,'requestPermission');
			$scope.grantPermission = new timeSeriesUpdater($scope.recipeInstance.id,'grantPermission');
			
			var statuses = [
			    "System is currently offline.",
			    "Heating water for strike.",
			    "Pumping water to mash tun for strike.",
			    "Stabilizing hot liquor tun water temperature.",
			    "Mashing grain.",
			    "Raising hot liquor tun to 170&deg;F for mashout.",
			    "Mashout. Recirculating at 170&deg;F.",
			    "Preparing for sparge. Waiting for reconfiguration. Ensure output of HLT is configured to pump to Mash Tun.",
			    "Sparging. Pumping hot liquor into mash tun.",
			    "Preparing for boil. Waiting for reconfiguration. Ensure sparged liquid is configured to pump into boil kettle and boil kettle is empty.",
			    "Preheating boil. Raising temperature to boil temperature.",
			    "Cooling boil kettle. Make sure the cooling setup is in place.",
			    "Pumping cooled wort into fermeneter.",
			];
			$scope.$watch('currentStatus',function(){
				$scope.currentStatusText = statuses[$scope.currentStatus.latest];
				$scope.nextStatusText = statuses[$scope.currentStatus.latest + 1];
			},true);
			$scope.adjustState = function(amount){
				if ($scope.requestPermission.latest && amount==+1)
					$scope.grantPermission.set(true);
				else
					$scope.currentStatus.set($scope.currentStatus.latest + amount);
			};
			
			//add all the relevant time series to the chart data.
			$scope.dataPoints = [];
			$scope.dataPoints.push({'key':'Boil Actual',values:$scope.boilTemperatureActual.dataPoints});
			$scope.dataPoints.push({'key':'Boil Set Point','values':$scope.boilTemperatureSetPoint.dataPoints});
			$scope.dataPoints.push({'key':'Mash Actual',values:$scope.mashTemperatureActual.dataPoints});
			$scope.dataPoints.push({'key':'Mash Set Point','values':$scope.mashTemperatureSetPoint.dataPoints});
			
			//watch for permission request
			$scope.nextStateColor = 'btn-success';
			$interval(function(){
				if ($scope.requestPermission.latest)
					if ($scope.nextStateColor == 'btn-success')
						$scope.nextStateColor = 'btn-danger';
					else
						$scope.nextStateColor = 'btn-success';
				else
					$scope.nextStateColor = 'btn-success';
			},500);
			
			//overridable statuses - sensor ids for the child elements
			$scope.heatingElementStatusSensor = 9;
			$scope.heatingElementStatusSensorOverride = 10;
			
			$scope.pumpStatusSensor = 11;
			$scope.pumpStatusSensorOverride = 12;
			
			
			//list of tasks to be displayed in the task list
			$scope.tasks = [
			    {name:"Sanitizing Soak"},
			    {name:"Hot Sanitizing Recirculation"},
			    {name:"Run Brew Cycle"},
			    {name:"Measure Post-Mash Gravity"},
			    {name:"Clean Mash Tun"},
			    {name:"Sanitize Fermenters"},
			    {name:"Measure Post-Boil Gravity"},
			    {name:"Rack to Fermenters"},
			    {name:"Clean Boil Kettle and Chiller"},	    
			];		
			
			$.toasts("add",{msg: "Welcome to Joulia!"});
	
			
			/**
			 * create and maintain chart
			 */ 
			$scope.chart = null;
			$scope.chart = nv.models.lineChart()
				.x(function(d) { return d[0] })
				.y(function(d) { return d[1] }) //adjusting, 100% is 1.00, not 100 as it is in the data
				.color(d3.scale.category10().range())
				.useInteractiveGuideline(true);
			$scope.chart.xAxis
				.tickFormat(function(d) {
					return d3.time.format('%H:%M')(new Date(d))
				});
			$scope.chart.yAxis
				.tickFormat(d3.format(',.1f'));
			
			function updateChart(){
				d3.select('#chart svg')
				    //TODO: I shouldnt need to do a deep copy. nvd3 seems to screw around with the references in $scope.dataPoints otherwise and it becomes detached from the service (I think its from a map call that sets to itself)
					.datum(angular.copy($scope.dataPoints))
					.call($scope.chart);
				
				//TODO: Figure out a good way to do this automatically
				nv.utils.windowResize($scope.chart.update);
				
				//calculate min/max in current dataset
				//TODO: I don't know why nvd3 messes up sometimes, but we had to force calculat this
				var min = _.reduce($scope.dataPoints,function(currentMin,dataPointArray){
					var min = _.reduce(dataPointArray.values,function(currentMin,dataPoint){
						return Math.min(dataPoint[1],currentMin);
					},Infinity);
					return Math.min(min,currentMin);
				},Infinity);
				var max = _.reduce($scope.dataPoints,function(currentMax,dataPointArray){
					var max = _.reduce(dataPointArray.values,function(currentMax,dataPoint){
						return Math.max(dataPoint[1],currentMax);
					},Infinity);
					return Math.max(min,currentMax);
				},-Infinity);
				var minSpread = 10.; //make sure we have a spread
				if ((max-min) < minSpread){
					var spreadAdjust = (minSpread-(max-min))*.5;
					max+= spreadAdjust;
					max-= spreadAdjust;
				}
				$scope.chart.forceY([min,max]);//update min/max
		
				return $scope.chart;
			}
			nv.addGraph(updateChart);
			$interval(updateChart,5000.);//replot every second rather than everytime we get new data so we arent plotting all the time
		};
	}])
	.controller('endRecipeModalCtrl', ['$scope','$uibModalInstance',function ($scope, $uibModalInstance) {		
		
		$scope.ok = function () {
			$uibModalInstance.close(true);
		};
 		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}]);;
	//angular.module('toggleableElementModule', []);
});