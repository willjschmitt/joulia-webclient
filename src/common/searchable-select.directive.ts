import angular = require('angular');

searchableSelect.$inject = ['$interpolate'];

export function searchableSelect($interpolate) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      // The parent model to edit. The parent is not the final model to edit,
      // since often the value is a primitive like a db primary key. Since
      // two way binding won't work on primitives, attribute and parent must
      // be defined together. Attribute should be a string name of the
      // attribute to set on parent.
      parent: '=',
      attribute: '=',

      // The $resource that can be searched against with a 'search' generic
      // parameter and an 'id' parameter.
      searchResource: '=',

      // HTML to render for each item in the search dropdown.
      itemHtml: '=',

      // Function to callback when the select changes values.
      change: '=',

      // Label to use as a placeholder in the select dropdown.
      label: '=',
    },
    templateUrl: 'common/searchable-select.tpl.html',
    link: function searchableSelectController($scope) {
      $scope.refreshItems = refreshItems;

      $scope.$watch('parent[attribute]', () => refreshItems());

      /**
       * Compiles the provided itemHtml into a function which can be called
       * with the item to produce a formatted item entry in the search
       * dropdown.
       */
      function compileItemHTML() {
        $scope.itemHTMLCompiled = $interpolate($scope.itemHtml || '');
      }
      $scope.$watch('itemHtml', compileItemHTML);

      /**
       * Refresh items with a search query performed against the server.
       */
      function refreshItems(searchParameter?) {
        const searchTerms = {};
        if ($scope.parent !== null && $scope.parent !== undefined
            && $scope.parent[$scope.attribute] !== null
            && $scope.parent[$scope.attribute] !== undefined) {
          searchTerms.id = $scope.parent[$scope.attribute];
        }
        if (searchParameter) {
          searchTerms.search = searchParameter;
        }
        if (angular.equals(searchTerms, {})) {
          return;
        }
        $scope.items = $scope.searchResource.query(searchTerms);
      }
    },
  };
}
