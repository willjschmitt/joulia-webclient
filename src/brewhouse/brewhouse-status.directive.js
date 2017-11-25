(function loadBrewhouseStatusDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseStatus', brewhouseStatus);

  brewhouseStatus.$inject = [
    'TimeSeriesUpdater', '$interval', 'brewhouseStates'];

  function brewhouseStatus(TimeSeriesUpdater, $interval, brewhouseStates) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        brewhouse: '=',
        recipeInstance: '=',
      },
      templateUrl: 'brewhouse/brewhouse-status.tpl.html',
      link: function brewhouseStatusController($scope) {
        $scope.currentStatus = new TimeSeriesUpdater(
            $scope.recipeInstance, 'state');
        $scope.timer = new TimeSeriesUpdater(
            $scope.recipeInstance, 'timer');
        $scope.requestPermission = new TimeSeriesUpdater(
            $scope.recipeInstance, 'request_permission');
        $scope.grantPermission = new TimeSeriesUpdater(
            $scope.recipeInstance, 'grant_permission');

        $scope.adjustState = adjustState;

        $scope.currentStatusText = currentStatusText;
        $scope.nextStatusText = nextStatusText;

        // Text version of the states, which matches the order and index of
        // the numerical status.
        const states = brewhouseStates.getStates(
          $scope.brewhouse.software_version);

        /**
         * Calculates the text for the current state.
         *
         * @param {Number} currentStatus The numerical status the system
         *     is currently in.
         */
        function currentStatusText(currentStatus) {
          return getStatusText(currentStatus);
        }

        /**
         * Calculates the text for the next state.
         *
         * @param {Number} currentStatus The numerical status the system
         *     is currently in.
         */
        function nextStatusText(currentStatus) {
          return getStatusText(currentStatus + 1);
        }

        /**
         * Get's the status text for the given status index. If the index is out
         * of bounds, returns an empty string.
         *
         * @param {Number} statusId The status index to retreive the text for.
         * @returns Status text.
         */
        function getStatusText(statusId) {
          if (statusId < 0 || statusId >= states.statesOrdered.length) {
            return '';
          }
          return states.statesOrdered[statusId].description;
        }

        /**
         * Changes the current state by the requested amount. If permission was
         * requested, grants the permission. Permission granting is only checked
         * on a +1 state increase. Otherwise, just sets the status stream to the
         * new value.
         *
         * @param {Number} amount The number of states to change (negative or
         *                        positive).
         */
        function adjustState(amount) {
          if ($scope.requestPermission.latest && amount === +1) {
            // currentStatus will be modified by the server when granting
            // permission, so no need to adjust state directly.
            $scope.grantPermission.set(true);
          } else {
            $scope.currentStatus.set($scope.currentStatus.latest + amount);
          }
        }

        /**
         * Calculates the class for the next state button, which could be
         * toggling on/off to show need for action. If permission is requested,
         * toggles between success and danger. If not, stays a solid success.
         * This is not a calculated function bound to scope, since it needs to
         * be updated periodically for a 0.5second flash.
         */
        function updateStateColor() {
          if ($scope.requestPermission.latest) {
            if ($scope.nextStateColor === 'btn-success') {
              $scope.nextStateColor = 'btn-danger';
            } else {
              $scope.nextStateColor = 'btn-success';
            }
          } else {
            $scope.nextStateColor = 'btn-success';
          }
        }
        $scope.nextStateColor = 'btn-success';
        $interval(updateStateColor, 500);
      },
    };
  }
}());
