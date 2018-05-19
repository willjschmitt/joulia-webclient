/* eslint-disable */

// TODO(willjschmitt): Move this back to src/test once imports are figured out
// in the build chain.

/**
 * Helper for tests to find an input element with the id htmlId in element, an
 * angular element. Sets the value, on scopeObj at attributeName, refreshes the
 * digest on scope, and checks the applied value is found in the input element.
 * Handles checking the value satisfies integer conversions correctly.
 */
export function checkIntegerInputIsSetCorrectly(
    element, scope, scopeObj, attributeName, value, htmlId) {
  scopeObj[attributeName] = value;
  scope.$digest();

  const got = $(element).find(htmlId).val().toString();
  expect(parseInt(got)).toEqual(value);
}

/**
 * Helper for tests to find an input element with the id htmlId in element, an
 * angular element. Sets the value, on scopeObj at attributeName, refreshes the
 * digest on scope, and checks the applied value is found in the input element.
 * Handles checking the value satisfies float conversions correctly.
 */
export function checkFloatInputIsSetCorrectly(
    element, scope, scopeObj, attributeName, value, htmlId) {
  scopeObj[attributeName] = value;
  scope.$digest();

  const got = $(element).find(htmlId).val().toString();
  expect(parseFloat(got)).toEqual(value);
}
