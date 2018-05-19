brewhouseStatus.$inject = [
  'TimeSeriesUpdater', '$interval', 'brewhouseStates'];

export function brewhouseStatus(TimeSeriesUpdater, $interval, brewhouseStates) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      brewhouse: '=',
      recipeInstance: '=',

      // The number of seconds to filter on (negative indicating the past) for
      // requesting historical data.
      historyTime: '=',
    },
    templateUrl: 'brewhouse/brewhouse-status.tpl.html',
    link: function brewhouseStatusController($scope) {
      $scope.currentStatus = new TimeSeriesUpdater(
          $scope.recipeInstance, 'state', 'value', $scope.historyTime);
      $scope.timer = new TimeSeriesUpdater(
          $scope.recipeInstance, 'timer', 'value', $scope.historyTime);
      $scope.requestPermission = new TimeSeriesUpdater(
          $scope.recipeInstance, 'request_permission', 'value',
          $scope.historyTime);
      $scope.grantPermission = new TimeSeriesUpdater(
          $scope.recipeInstance, 'grant_permission', 'value',
          $scope.historyTime);

      $scope.adjustState = adjustState;

      $scope.nextStatusText = nextStatusText;

      $scope.states = brewhouseStates.getStates(
        $scope.brewhouse.software_version);

      /**
       * Calculates the text for the next state. If the index is out of
       * bounds, returns an empty string.
       *
       * @param {Number} statusId The numerical status the system
       *     is currently in.
       */
      function nextStatusText(statusId) {
        if (statusId < 0 || statusId >= $scope.states.statesOrdered.length) {
          return '';
        }
        return $scope.states.statesOrdered[statusId + 1].description;
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
