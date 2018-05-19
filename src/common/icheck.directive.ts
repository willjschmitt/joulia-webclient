import 'iCheck';

icheck.$inject = [];

export function icheck() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function icheckController($scope, $element, $attr, $ngModel) {
      $($element).iCheck({
        checkboxClass: 'custom-switch',
        radioClass: 'custom-switch',
        inheritClass: true,
      }).on('ifChanged', function updateNgModel(event) {
        if ($attr.type === 'radio') {
          $ngModel.$setViewValue($attr.value);
        } else {
          $ngModel.$setViewValue(event.target.checked);
        }
        $scope.$digest();
      });

      // Update the iCheck element if the model is changed programatically.
      $scope.$watch($attr.ngModel, function updateICheck() {
        $($element).iCheck('update');
      }, true);
    },
  };
}
