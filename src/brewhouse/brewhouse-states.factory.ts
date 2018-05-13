(function loadBrewhouseStatesFactory() {
  angular
    .module('app.common')
    .factory('brewhouseStates', brewhouseStates);

  brewhouseStates.$inject = ['breweryResources'];

  function brewhouseStates(breweryResources) {
    function getStates(softwareReleaseId) {
      const states = breweryResources.BrewingState.query({
        software_release: softwareReleaseId,
      });
      return {
        statesEnum: _.map(states, function constructStateEnum(state) {
          const kv = {};
          kv[state.name] = state.index;
          return kv;
        }),
        statesOrdered: states,
      };
    }

    return {
      getStates: getStates,
    };
  }
}());
