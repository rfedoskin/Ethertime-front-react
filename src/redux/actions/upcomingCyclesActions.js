export const UPCOMING_SET = 'UPCOMING_SET';
export const UPCOMING_UPDATE = 'UPCOMING_UPDATE';
export const UPCOMING_REFRESH = 'UPCOMING_REFRESH';

export function setUpcomingCycles(cycles) {
  return { type: UPCOMING_SET, cycles };
}
export function updateUpcomingCycle(cycle) {
  return { type: UPCOMING_UPDATE, cycle };
}

export function refreshUpcomingCycle(rootId) {
  return { type: UPCOMING_REFRESH, rootId };
}
