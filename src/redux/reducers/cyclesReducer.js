import { CYCLES_SET, CYCLES_INSERT, CYCLES_UPDATE } from '../actions/cyclesActions';

const initialState = {
  activeCycles: [],
  finishedCycles: [],
};

const cyclesReducer = (state = initialState, action) => {
  const oldState = { ...state };

  switch (action.type) {
    case CYCLES_SET: {
      const targetArray = action.cyclesStatus === 0 ? 'activeCycles' : 'finishedCycles';
      return {
        ...oldState,
        [targetArray]: [...action.cycles],
      };
    }

    case CYCLES_INSERT: {
      const cycleToInsert = action.cycle;
      const targetArray = !cycleToInsert.isEnded ? 'activeCycles' : 'finishedCycles';

      const insertedCycleIndex = oldState[targetArray].findIndex(
        cycle => cycle.rootId === cycleToInsert.rootId
      );

      if (insertedCycleIndex !== -1) {
        const updatedCycles = [
          ...oldState[targetArray].slice(0, insertedCycleIndex),
          cycleToInsert,
          ...oldState[targetArray].slice(insertedCycleIndex + 1),
        ];
        return {
          ...oldState,
          [targetArray]: updatedCycles,
        };
      }

      return {
        ...oldState,
        [targetArray]: [...oldState[targetArray], cycleToInsert],
      };
    }

    case CYCLES_UPDATE: {
      const cycleToUpdate = action.cycle;
      const targetArray = !cycleToUpdate.isEnded ? 'activeCycles' : 'finishedCycles';

      const updatedCycleIndex = oldState[targetArray].findIndex(
        cycle => cycle.rootId === cycleToUpdate.rootId
      );

      if (updatedCycleIndex === -1) {
        return oldState;
      }

      const updatedCycles = [
        ...oldState[targetArray].slice(0, updatedCycleIndex),
        cycleToUpdate,
        ...oldState[targetArray].slice(updatedCycleIndex + 1),
      ];

      return {
        ...oldState,
        [targetArray]: updatedCycles,
      };
    }

    default:
      return state;
  }
};

export const getActiveCycles = state => {
  return state.cyclesReducer.activeCycles;
};

export const getActiveCycle = (state, rootId) => {
  const resultArr = state.cyclesReducer.activeCycles.filter(cycle => cycle.rootId === rootId);
  const result = resultArr.length > 0 ? resultArr[0] : null;
  return result;
};

export default cyclesReducer;
