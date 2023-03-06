export const APPTIMER_TICK = 'APPTIMER_TICK';
export const APP_FININSH_LOADING = 'APP_FININSH_LOADING';
export const APP_LOAD = 'APP_LOAD';
export const CONTRACT_LOAD = 'CONTRACT_LOAD';
export const LOTTERIES_SET = 'LOTTERIES_SET';
export const SET_HINT_SHOWN = 'SET_HINT_SHOWN';
export const CHANGE_MEDIA_SIZE = 'CHANGE_MEDIA_SIZE';

export function updateTimer(date) {
  return { type: APPTIMER_TICK, nowTime: date };
}
export function finishLoadingApp() {
  return { type: APP_FININSH_LOADING };
}
export function setHintShown(isShown) {
  return { type: SET_HINT_SHOWN, isShown };
}
export function mediaSizeChanged(mediaSize) {
  return { type: CHANGE_MEDIA_SIZE, mediaSize };
}
