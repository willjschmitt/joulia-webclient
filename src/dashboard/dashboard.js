angular
  .module('app.dashboard', [])
  .controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', 'breweryApi', '$uibModal'];

function DashboardController($scope, breweryApi, $uibModal) {
  $scope.brewerys = [];
  updateBrewerys();

  function updateBrewerys() {
    $scope.brewerys = breweryApi.brewery.query(initializeBrewerys);
  }

  function initializeBrewerys() {
    $scope.brewhouses = {};
    _.each($scope.brewerys, function getBrewhouse(brewery) {
      $scope.brewhouses[brewery.id] = breweryApi.brewhouse.query(
          { brewery: brewery.id });
    });
  }

  // Empty dict for which brewhouses to show the keys for.
  $scope.showBrewhouseTokens = {};
  $scope.toggleShowBrewhouseToken = toggleShowBrewhouseToken;
  $scope.addBrewery = addBrewery;
  $scope.addBrewhouse = addBrewhouse;

  // Initializes all the tooltips dynamically loaded, etc.
  window.bematadmin.App.init();

  function toggleShowBrewhouseToken(brewhouseId) {
    if (!$scope.showBrewhouseTokens.hasOwnProperty(brewhouseId)) {
      $scope.showBrewhouseTokens[brewhouseId] = true;
    } else {
      $scope.showBrewhouseTokens[brewhouseId] =
          !$scope.showBrewhouseTokens[brewhouseId];
    }
  }

  function addBrewery() {
    const modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'static/brewery/html/add-brewery-modal.html',
      controller: 'addBreweryModalCtrl',
    });

    modalInstance.result.then(updateBrewerys);
  }

  function addBrewhouse(brewery) {
    const modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'static/brewery/html/add-brewhouse-modal.html',
      controller: 'addBrewhouseModalCtrl',
      resolve: {
        brewery: brewery,
      },
    });

    modalInstance.result.then(updateBrewerys);
  }
}
