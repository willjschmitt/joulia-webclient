/**
 * Mock library to represent BematAdmin, which is a commercially licensed
 * library. This mocks it's behavior only by providing dead functions.
 */

(function loadBematAdminCommonMock() {
  function App() {
    $.toasts({});
  }

  App.prototype.init = function init() {};

  window.bematadmin = window.bematadmin || {};
  window.bematadmin.App = new App();
}());
