export const CYCLES_SET = 'CYCLES_SET';
export const CYCLES_INSERT = 'CYCLES_INSERT';
export const CYCLES_UPDATE = 'CYCLES_UPDATE';
export const CYCLE_RESTART = 'CYCLE_RESTART';

export function setCycles(cycles, cyclesStatus) {
  return { type: CYCLES_SET, cycles, cyclesStatus };
}
export function insertCycle(cycle) {
  return { type: CYCLES_INSERT, cycle };
}
export function updateCycle(cycle) {
  return { type: CYCLES_UPDATE, cycle };
}
export function restartCycle(rootId) {
  return { type: CYCLE_RESTART, rootId };
}
