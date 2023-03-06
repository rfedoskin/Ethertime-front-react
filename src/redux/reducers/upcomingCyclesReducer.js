import { UPCOMING_SET, UPCOMING_UPDATE } from '../actions/upcomingCyclesActions';
import { CYCLES_INSERT, CYCLES_UPDATE } from '../actions/cyclesActions';

const initialState = {
  cycles: [],
};

const upcomingCyclesReducer = (state = initialState, action) => {
  const oldState = { ...state };

  switch (action.type) {
    case UPCOMING_SET:
      return {
        ...oldState,
        cycles: [...action.cycles],
      };

    case UPCOMING_UPDATE: {
      const cycleToUpdate = action.cycle;

      const updatedCycleIndex = oldState.cycles.findIndex(
        cycle => cycle.rootId === cycleToUpdate.rootId
      );

      if (updatedCycleIndex === -1) {
        return oldState;
      }

      const updatedCycles = [
        ...oldState.cycles.slice(0, updatedCycleIndex),
        cycleToUpdate,
        ...oldState.cycles.slice(updatedCycleIndex + 1),
      ];

      return {
        ...oldState,
        cycles: updatedCycles,
      };
    }

    // Используется для отлова событий рестарта/окончания/выплаты лотерей
    case CYCLES_INSERT:
    case CYCLES_UPDATE: {
      const cycleToUpdate = action.cycle;

      const updatedCycleIndex = oldState.cycles.findIndex(
        cycle => cycle.rootId === cycleToUpdate.rootId && cycle.number === cycleToUpdate.number
      );

      if (updatedCycleIndex === -1) {
        return oldState;
      }

      const updatedCycles = [
        ...oldState.cycles.slice(0, updatedCycleIndex),
        cycleToUpdate,
        ...oldState.cycles.slice(updatedCycleIndex + 1),
      ];

      return {
        ...oldState,
        cycles: updatedCycles,
      };
    }

    default:
      return oldState;
  }
};

export const getUpcomingCycles = state => {
  const { cycles } = state.upcomingCyclesReducer;
  const fixedCycles = cycles.map(cycle => {
    return {
      ...cycle,
      isFixed: true,
    };
  });
  return fixedCycles;
};

export default upcomingCyclesReducer;
