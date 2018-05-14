httpStatus.$inject = [];

/**
 * Provides utilities for checking http status codes, as well as constants
 * for these status codes.
 */
export function httpStatus() {
  const self = this;

  // TODO(willjschmitt): Add more codes as they are needed.
  self.HTTP_NOT_AUTHENTICATED = 401;
  self.HTTP_NOT_AUTHORIZED = 403;
}
