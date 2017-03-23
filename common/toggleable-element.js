define(['angularAMD','moment','timeseries',
        'brewery-api'],function(angularAMD,moment){
  angularAMD
  .directive('toggleableElement', ['timeSeriesUpdater','breweryApi',
                                   function(timeSeriesUpdater,breweryApi) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        name:"=",
        recipeInstance: "=",
        sensorName: "=",
      },
      templateUrl: 'static/html/angular-directives/toggleable-element.html',
      link: function ($scope) {
        //subscribe to value and override 
        $scope.elementStatus = new timeSeriesUpdater($scope.recipeInstance,$scope.sensorName);
        $scope.elementOverride = new timeSeriesUpdater($scope.recipeInstance,$scope.sensorName + "Override");

        //status setters
        $scope.toggleElementStatus = function(){$scope.setElementStatus(!$scope.elementStatus.latest);};
        $scope.setElementStatus = function(statusValue){
          function __setElementStatus(statusValue){
            var now = moment().toISOString();
            var data = {
              recipe_instance: $scope.recipeInstance,
              sensor: $scope.elementStatus.sensor,
              value: statusValue,
              time: now,
            };
            var newData = new breweryApi.timeSeriesDataPoint(data);
            newData.$save();
          }

          //make sure we have the override set
          if (!$scope.elementOverride.latest) {
            $scope.toggleElementOverride(function(){
              __setElementStatus(statusValue);
            });
          }
          else {
            __setElementStatus(statusValue);
          }
        };

        //override setters
        $scope.toggleElementOverride = function(callback){$scope.setElementOverride(!$scope.elementOverride.latest,callback);};
        $scope.setElementOverride = function(overrideValue,callback){
          var now = moment().toISOString();
          var data = {
            recipe_instance: $scope.recipeInstance,
            sensor: $scope.elementOverride.sensor,
            value: overrideValue,
            time: now,
          };
          var newData = new breweryApi.timeSeriesDataPoint(data);
          newData.$save(function(){ if (callback) callback(); });
        }
      }
    };
  }]);
});