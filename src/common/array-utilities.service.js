(function loadArrayUtilitiesService() {
  angular
    .module('app.common')
    .service('arrayUtilities', arrayUtilities);

  function arrayUtilities() {
    const self = this;

    self.minimumInArrays = minimumInArrays;
    self.maximumInArrays = maximumInArrays;

    /**
     * Finds the minimum value in all value arrays provided. Assumes the
     * provided arrays are actually objects, each with an array of values at the
     * key 'values'.
     * Example:
     *   arrays: [
     *     { values: [[0.0, 1], [0.1, 2], [0.2, 3]] },
     *     { values: [[0.0, 4], [0.1, 5], [0.2, 6]] },
     *   ]
     *   returns: 1
     *
     * @param{Object[]} arrays   An array of objects with arrays at key
     *                           'values'.
     * @returns The global minimum found across all datapoints. +Infinity if no
     *          data points provided.
     */
    function minimumInArrays(arrays) {
      const minimumOrMaximum = true;
      return extremeInArrays(arrays, minimumOrMaximum);
    }

    /**
     * Finds the maximum value in all value arrays provided. Assumes the
     * provided arrays are actually objects, each with an array of values at the
     * key 'values'.
     * Example:
     *   arrays: [
     *     { values: [[0.0, 1], [0.1, 2], [0.2, 3]] },
     *     { values: [[0.0, 4], [0.1, 5], [0.2, 6]] },
     *   ]
     *   returns: 6
     *
     * @param{Object[]} arrays   An array of objects with arrays at key
     *                           'values'.
     * @returns The global maximum found across all datapoints. +Infinity if no
     *          data points provided.
     */
    function maximumInArrays(arrays) {
      const minimumOrMaximum = false;
      return extremeInArrays(arrays, minimumOrMaximum);
    }

    /**
     * Finds the extreme value in all value arrays provided. Assumes the
     * provided arrays are actually objects, each with an array of values at the
     * key 'values'.
     * Example:
     *   arrays: [
     *     { values: [[0.0, 1], [0.1, 2], [0.2, 3]] },
     *     { values: [[0.0, 4], [0.1, 5], [0.2, 6]] },
     *   ]
     *   returns: 1
     *
     * @param{Object[]} arrays   An array of objects with arrays at key
     *                           'values'.
     * @param{Bool}     minOrMax Should be true if calculating min, otherwise
     *                           false.
     * @returns The global minimum found across all datapoints. +Infinity if no
     *          data points provided.
     */
    function extremeInArrays(arrays, minimumOrMaximum) {
      const memoStart = minimumOrMaximum ? +Infinity : -Infinity;
      return _.reduce(
          arrays, (memo, iter) => extremeInArray(memo, iter, minimumOrMaximum),
          memoStart);
    }


    /**
     * Finds the extreme value in the value array provided. Assumes the
     * individual elements are a pair of time and value.
     * Example:
     *   array: [[0.0, 1], [0.1, 2], [0.2, 3]]
     *   minimumOrMaximum: true
     *   returns: 1
     * @param{Number}  currentMin The minimum passed as the memo from the reduce
     *                            memoization function.
     * @param{Array[]} array      The array of datapoint pairs.
     * @param{Bool}    minOrMax   Should be true if calculating min, otherwise
     *                            false.
     * @returns The global minimum found across all datapoints. +Infinity if no
     *          data points provided.
     */
    function extremeInArray(currentMin, array, minimumOrMaximum) {
      const memoStart = minimumOrMaximum ? +Infinity : -Infinity;
      const minArray = _.reduce(
          array.values,
          (memo, iter) => extremeInPoints(memo, iter, minimumOrMaximum),
          memoStart);

      const extremeFunction = minimumOrMaximum ? Math.min : Math.max;
      return extremeFunction(minArray, currentMin);
    }

    /**
     * Finds the extreme from a datapoint and a provided memoized extreme.
     *
     * @param{Number}   memo     The extreme passed as the memo from the reduce
     *                           memoization function.
     * @param{Number[]} point    The datapoint to compare to the extreme. Should
     *                           be a time, value pair.
     * @param{Bool}     minOrMax Should be true if calculating min, otherwise
     *                           false.
     * @returns The extreme of the provided currentMin and the value in the
     *          point time, value pair.
     */
    function extremeInPoints(currentMin, point, minimumOrMaximum) {
      const extremeFunction = minimumOrMaximum ? Math.min : Math.max;
      return extremeFunction(point[1], currentMin);
    }
  }
}());
