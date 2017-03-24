angular
  .module('app.dashboard', [])
  .controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', 'breweryApi', '$uibModal'];

function DashboardController($scope, breweryApi, $uibModal) {
  $scope.brewerys = breweryApi.brewery.query(initializeBrewerys);

  function initializeBrewerys() {
    $scope.brewhouses = {};
    _.each($scope.brewerys, function(brewery) {
      $scope.brewhouses[brewery.id] = breweryApi.brewhouse.query(
          {brewery: brewery.id});
    });
  }

  // Empty dict for which brewhouses to show the keys for.
  $scope.showBrewhouseTokens = {};

  $scope.toggleShowBrewhouseToken = function(brewhouseId) {
    if (!$scope.showBrewhouseTokens.hasOwnProperty(brewhouseId)) {
      $scope.showBrewhouseTokens[brewhouseId] = true;
    } else {
      $scope.showBrewhouseTokens[brewhouseId] = 
          !$scope.showBrewhouseTokens[brewhouseId];
    }
  };

  $scope.addBrewery = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'static/brewery/html/add-brewery-modal.html',
      controller: 'addBreweryModalCtrl'
    });

    modalInstance.result.then(function (result) {
      $scope.brewerys = breweryApi.brewery.query(initializeBrewerys);
    });
  };

  $scope.addBrewhouse = function(brewery) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'static/brewery/html/add-brewhouse-modal.html',
      controller: 'addBrewhouseModalCtrl',
      resolve: {
        brewery: function() {
          return brewery;
        }
      }
    });

    modalInstance.result.then(function (result) {
      $scope.brewerys = breweryApi.brewery.query(initializeBrewerys);
    });
  };

  // Initializes all the tooltips dynamically loaded, etc.
  window.bematadmin.App.init();
}
