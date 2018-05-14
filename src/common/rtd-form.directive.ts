rtdForm.$inject = [];

export function rtdForm() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      temperatureSensor: '=',
    },
    templateUrl: 'common/rtd-form.tpl.html',
    link: function rtdFormController() {},
  };
}
