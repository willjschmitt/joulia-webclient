/* eslint-disable */
describe('app.common', function () {
  beforeEach(module('app.common'));
  beforeEach(module('joulia.templates'));

  // Mocks the user service, so we can manipulate user preferences from here.
  var user = {};

  var $rootScope, $compile, $httpBackend;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('rtd-form directive', function () {
    var element, scope, isolatedScope;

    beforeEach(function () {
      const html = `
        <rtd-form
          temperature-sensor="temperatureSensor">
        </rtd-form>`;
      scope = $rootScope.$new();
      scope.temperatureSensor = {
        rtd: {},
        amplifier: {},
      };

      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    it('sets analog_pin', function () {
      checkIntegerInputIsSetCorrectly(
          element, scope, scope.temperatureSensor, 'analog_pin', 10,
          '#analog_pin');
    });

    it('sets tau_filter', function () {
      checkFloatInputIsSetCorrectly(
          element, scope, scope.temperatureSensor, 'tau_filter', 10.0,
          '#tau_filter');
    });

    it('sets analog_reference', function () {
      checkFloatInputIsSetCorrectly(
          element, scope, scope.temperatureSensor, 'analog_reference', 3.3,
          '#analog_reference');
    });

    it('sets rtd.alpha', function () {
      checkFloatInputIsSetCorrectly(
          element, scope, scope.temperatureSensor.rtd, 'alpha', 0.00385,
          '#rtd__alpha');
    });

    it('sets rtd.zero_resistance', function () {
      checkFloatInputIsSetCorrectly(
          element, scope, scope.temperatureSensor.rtd, 'zero_resistance', 100.0,
          '#rtd__zero_resistance');
    });

    it('sets amplifier.vcc', function () {
      checkFloatInputIsSetCorrectly(
          element, scope, scope.temperatureSensor.amplifier, 'vcc', 3.3,
          '#amplifier__vcc');
    });

    it('sets amplifier.amplifier_resistance_a', function () {
      checkFloatInputIsSetCorrectly(
          element, scope, scope.temperatureSensor.amplifier,
          'amplifier_resistance_a', 15000.0,
          '#amplifier__amplifier_resistance_a');
    });

    it('sets amplifier.amplifier_resistance_b', function () {
      checkFloatInputIsSetCorrectly(
          element, scope, scope.temperatureSensor.amplifier,
          'amplifier_resistance_b', 270000.0,
          '#amplifier__amplifier_resistance_b');
    });

    it('sets amplifier.offset_resistance_top', function () {
      checkFloatInputIsSetCorrectly(
          element, scope, scope.temperatureSensor.amplifier,
          'offset_resistance_top', 100000.0,
          '#amplifier__offset_resistance_top');
    });

    it('sets amplifier.offset_resistance_bottom', function () {
      checkFloatInputIsSetCorrectly(
          element, scope, scope.temperatureSensor.amplifier,
          'offset_resistance_bottom', 10000.0,
          '#amplifier__offset_resistance_bottom');
    });
  });
});