(function loadSecondsToTimerFilter() {
  angular
    .module('app.common')
    .filter('secondsToTimer', secondsToTimerFilter);

  function secondsToTimerFilter() {
    return function secondsToTimer(secondsAbsolute) {
      const hours = Math.floor(secondsAbsolute / (60.0 * 60.0));
      secondsAbsolute -= hours * 60.0 * 60.0;
      const minutes = Math.floor(secondsAbsolute / 60.0);
      secondsAbsolute -= minutes * 60.0;
      const seconds = Math.floor(secondsAbsolute);
      const hoursString = (hours > 0) ? (`00${hours}:`).slice(-3) : '';
      const minutesString = (`00${minutes}:`).slice(-3);
      const secondsString = (`00${seconds}`).slice(-2);
      return `${hoursString}${minutesString}${secondsString}`;
    };
  }
}());
