import * as $ from 'jquery';

publicSidebar.$inject = ['$document'];

export function publicSidebar($document) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'public/public-sidebar.tpl.html',
    link: function publicSidebarController($scope) {
      // Boolean indicating state of showing the sidebar.
      $scope.showSidebar = false;
      // Function used to toggle sidebar from view.
      $scope.toggleSidebar = toggleSidebar;

      $($document).on('click', closeSidebar);

      /**
       * Toggles the sidebar to be shown or not based on current state.
       */
      function toggleSidebar() {
        $scope.showSidebar = !$scope.showSidebar;
      }

      /**
       * Closes the sidebar regardless of current state.
       */
      function closeSidebar() {
        $scope.showSidebar = false;
        $scope.$apply();
      }
    },
  };
}
