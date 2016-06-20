define(['angularAMD','moment',"peity",'timeseries'],function(angularAMD,moment){
	angularAMD
	.directive('valueCard', ['timeSeriesUpdater', function(timeSeriesUpdater){
		return {
		    restrict: 'E',
		    transclude: true,
		    scope: {
		    	title:"=",
		    	valueName: "=",
		    	valueAlternateName: "=",
		    	units: "=",
		    	unitsAlternate: "=",
		    	overridable:"=",
		    	overridableAlternate:"=",
		    	recipeInstance:'=',
		    },
		    templateUrl: 'static/html/angular-directives/value-card.html',
		    link: function ($scope) {
		    	if (!$scope.unitsAlternate) $scope.unitsAlternate= $scope.units;
		    	
		    	//subscribe to value and override 
		    	$scope.value = new timeSeriesUpdater($scope.recipeInstance,$scope.valueName);
		    	if ($scope.overridable){$scope.valueOverride = new timeSeriesUpdater($scope.recipeInstance,$scope.valueName + "Override");}
		    	if ($scope.valueAlternateName) $scope.valueAlternate = new timeSeriesUpdater($scope.recipeInstance,$scope.valueAlternateName);
		    	if ($scope.overridableAlternate) $scope.valueOverride = new timeSeriesUpdater($scope.recipeInstance,$scope.valueAlternateName + "Override");
		    	
		    	
		    	if ($scope.overridable || $scope.overridableAlternate){
		    		$scope.overridden = false;
		    		$scope.increase_value = function(){
		    			$scope.setValue(($scope.overridable ? $scope.value.latest : $scope.valueAlternate.latest) + 1.);
		    		};
		    		$scope.decrease_value = function(){
		    			$scope.setValue(($scope.overridable ? $scope.value.latest : $scope.valueAlternate.latest) - 1.);
		    		};
		    	}
		    	
		    	$scope.setValue = function(value){
		    		function __setValue(value){
		    			var now = moment().toISOString();
		    			$.ajax({
			    			url: "/live/timeseries/new/", type: "POST", dataType: "text",
			    			data: $.param({
				    			recipe_instance: $scope.recipeInstance,
				    			sensor: $scope.overridable ? $scope.value.sensor : $scope.valueAlternate.sensor,
				    			value: value,
				    			time: now,
				    		})
				    	});
			    	}
		    		
		    		//make sure we have the override set
		    		if (!$scope.valueOverride.latest)
		    			$scope.toggleOverride(function(){__setValue(value);});
		    		else
		    			__setValue(value);
		    	};
		    	
		    	
		    	//override setters
		    	$scope.toggleOverride = function(callback){$scope.setOverride(!$scope.valueOverride.latest,callback);};
		    	$scope.setOverride = function(value,callback){
		    		var now = moment().toISOString();
		    		$.ajax({
		    			url: "/live/timeseries/new/", type: "POST", dataType: "text",
		    			data: $.param({
		        			recipe_instance: $scope.recipeInstance,
		        			sensor: $scope.valueOverride.sensor,
		        			value: value,
		        			time: now,
		        		}), success: function(){ if (callback) callback(); }
		        	});
		    	}
		    	
		    	//give us all the little line things for the little cards
				$(".peity-line").peity("line",{height: 28,width: 64});
		    }
		};
	}]);
});