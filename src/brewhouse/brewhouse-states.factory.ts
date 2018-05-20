import angular = require('angular');
import * as _ from "underscore";

import '../common/brewery-resources.factory';

angular
  .module('app.brewhouse.states', ['app.common.brewery-resources',])
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
