(function loadBrewhouseStatesFactory() {
  angular
    .module('app.common')
    .factory('brewhouseStates', brewhouseStates);

  brewhouseStates.$inject = [];

  function brewhouseStates() {
    const statePrestart = {
      name: 'StatePrestart',
    };

    const statePremash = {
      name: 'StatePremash',
    };

    const stateStrike = {
      name: 'StateStrike',
    };

    const statePostStrike = {
      name: 'StatePostStrike',
    };

    const stateMash = {
      name: 'StateMash',
    };

    const stateMashoutRamp = {
      name: 'StateMashoutRamp',
    };

    const stateMashoutRecirculation = {
      name: 'StateMashoutRecirculation',
    };

    const stateSpargePrep = {
      name: 'StateSpargePrep',
    };

    const stateSparge = {
      name: 'StateSparge',
    };

    const statePreBoil = {
      name: 'StatePreBoil',
    };

    const stateMashToBoil = {
      name: 'StateMashToBoil',
    };

    const stateBoilPreheat = {
      name: 'StateBoilPreheat',
    };

    const stateBoil = {
      name: 'StateBoil',
    };

    const stateCool = {
      name: 'StateCool',
    };

    const statePumpout = {
      name: 'StatePumpout',
    };

    const stateDone = {
      name: 'StateDone',
    };

    return {
      statesEnum: {
        statePrestart: 0,
        statePremash: 1,
        stateStrike: 2,
        statePostStrike: 3,
        stateMash: 4,
        stateMashoutRamp: 5,
        stateMashoutRecirculation: 6,
        stateSpargePrep: 7,
        stateSparge: 8,
        statePreBoil: 9,
        stateMashToBoil: 10,
        stateBoilPreheat: 11,
        stateBoil: 12,
        stateCool: 13,
        statePumpout: 14,
        stateDone: 15,
      },
      statesOrdered: [
        statePrestart,
        statePremash,
        stateStrike,
        statePostStrike,
        stateMash,
        stateMashoutRamp,
        stateMashoutRecirculation,
        stateSpargePrep,
        stateSparge,
        statePreBoil,
        stateMashToBoil,
        stateBoilPreheat,
        stateBoil,
        stateCool,
        statePumpout,
        stateDone,
      ],
    };
  }
}());
