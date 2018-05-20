import angular = require('angular');

angular
  .module('app.common.rtd-form', ['app.templates',])
  .directive('rtdForm', rtdForm);

rtdForm.$inject = [];

function rtdForm() {
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
